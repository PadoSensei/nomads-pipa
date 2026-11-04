# Launch Checklist

**Project:** Nomads Pipa  
**File:** `docs/LAUNCH_CHECKLIST.md`
**Status:** Proposed  
**Release:** Discovery MVP — Version 1.0  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

This checklist defines what must be completed before launching Nomads Pipa to real users.

The first release focuses on:

- Local discovery directory.
- Business listings.
- Events and community information.
- Essential services.
- User-friendly mobile experience.
- Basic content administration.

The complete Traffic Router, quests, vouchers, and Flash Drops do not need to be finished for this first release.

**Launch principle:** Release a small, reliable, genuinely useful product rather than an unfinished platform with too many features.

---

## 2. Launch Readiness Overview

| Area                     | Required for MVP             |
| ------------------------ | ---------------------------- |
| Technical infrastructure | Yes                          |
| Database and permissions | Yes                          |
| Homepage and navigation  | Yes                          |
| Business directory       | Yes                          |
| Events                   | Yes                          |
| Essential services       | Yes                          |
| Admin content management | Yes                          |
| Mobile responsiveness    | Yes                          |
| Security testing         | Yes                          |
| Initial partner content  | Yes                          |
| User accounts            | Optional for public browsing |
| QR Traffic Router        | Later release                |
| Quest system             | Later release                |
| Voucher redemption       | Later release                |
| Flash Drops              | Later release                |

---

# 3. Technical Infrastructure

<badge color="success">Launch critical</badge>

### Application

- [ ] Next.js application runs successfully.
- [ ] TypeScript checks pass.
- [ ] Tailwind CSS is configured.
- [ ] shadcn/ui components are configured.
- [ ] Production build succeeds.
- [ ] Application has a consistent shared layout.
- [ ] Main navigation works.
- [ ] 404 page is implemented.
- [ ] Error states are implemented.
- [ ] Loading states are implemented.

### Supabase

- [ ] Production Supabase project created.
- [ ] Database migrations applied.
- [ ] Foreign keys verified.
- [ ] Indexes reviewed.
- [ ] Row Level Security enabled where required.
- [ ] RLS policies tested.
- [ ] Storage buckets configured.
- [ ] Storage access policies reviewed.
- [ ] Development and production environments separated.
- [ ] Backup and recovery approach reviewed.

### Environment configuration

- [ ] Production environment variables configured.
- [ ] `.env.example` committed.
- [ ] No credentials committed to Git.
- [ ] Service-role key restricted to trusted server-side environments.
- [ ] No private secrets exposed through client-side variables.
- [ ] Production configuration tested.

### Deployment

- [ ] Hosting provider configured.
- [ ] Production domain connected.
- [ ] HTTPS enabled.
- [ ] DNS records checked.
- [ ] Production build deployed.
- [ ] Deployment verified.
- [ ] Rollback procedure understood.

---

# 4. Database and Security

### Database integrity

- [ ] Categories load correctly.
- [ ] Business records load correctly.
- [ ] Business tags work.
- [ ] Events load correctly.
- [ ] Relationships work correctly.
- [ ] Published and draft statuses work.
- [ ] Required fields are validated.
- [ ] Database constraints prevent invalid records.

### Access control

- [ ] Public users can read published directory content.
- [ ] Public users cannot modify business records.
- [ ] Admin permissions are checked server-side.
- [ ] Private records are not exposed through public queries.
- [ ] Storage permissions prevent unauthorised uploads.
- [ ] API endpoints validate incoming data.
- [ ] Error responses do not reveal secrets or internal configuration.

### Privacy

- [ ] Only necessary personal information is collected.
- [ ] Privacy policy is available.
- [ ] Terms of use are available.
- [ ] Contact forms explain how submitted information is used.
- [ ] User data access is restricted.
- [ ] Retention and deletion procedures are documented.
- [ ] Applicable Brazilian data protection requirements, including LGPD, have been reviewed.

---

# 5. User Experience

### Homepage

- [ ] Nomads Pipa branding is visible.
- [ ] Homepage explains the platform clearly.
- [ ] Primary categories are accessible immediately.
- [ ] Featured businesses display correctly.
- [ ] Upcoming events display correctly.
- [ ] Search entry point works.
- [ ] Main CTAs work.
- [ ] No placeholder content remains.

### Navigation

- [ ] All primary categories are discoverable.
- [ ] Mobile navigation works.
- [ ] Navigation labels are understandable.
- [ ] Links do not lead to broken pages.
- [ ] Users can return to the homepage easily.

### Business directory

- [ ] Category pages work.
- [ ] Business cards display correctly.
- [ ] Business detail pages work.
- [ ] Images load correctly.
- [ ] Contact buttons work.
- [ ] Social links work.
- [ ] Contextual filters work.
- [ ] Empty results are handled correctly.

### Events

- [ ] Event listings display correctly.
- [ ] Event detail pages work.
- [ ] Event types are clearly identified.
- [ ] Dates and times are correct.
- [ ] Cancelled events are not presented as upcoming.
- [ ] External booking links work.

### Essential services

- [ ] Service categories are visible.
- [ ] Contact information has been checked.
- [ ] Emergency information is easy to find.
- [ ] Important information is clearly distinguished from general recommendations.

---

# 6. Content Readiness

### General content

- [ ] Homepage copy approved.
- [ ] Category descriptions completed.
- [ ] About Nomads Pipa content completed.
- [ ] Main CTAs reviewed.
- [ ] No spelling or formatting issues.
- [ ] All public links tested.

### Business content

- [ ] Initial business list prepared.
- [ ] Business names verified.
- [ ] Categories assigned.
- [ ] Descriptions reviewed.
- [ ] Contact information verified.
- [ ] Location information checked.
- [ ] Images approved for use.
- [ ] Contextual tags assigned.
- [ ] Partner consent confirmed where required.

### Events

- [ ] Initial event listings prepared.
- [ ] Dates verified.
- [ ] Locations verified.
- [ ] Event organisers identified.
- [ ] Event classifications checked.
- [ ] Cancelled events removed or marked.

### Essential services

- [ ] Emergency contacts verified against authoritative sources.
- [ ] Healthcare information reviewed.
- [ ] Repair service contacts checked.
- [ ] Courier information checked.
- [ ] Laundry and wellness listings reviewed.
- [ ] Immigration information linked to reliable sources.
- [ ] Pix guidance reviewed.

### Languages

- [ ] English interface reviewed.
- [ ] Portuguese interface reviewed.
- [ ] Navigation translations checked.
- [ ] Category translations checked.
- [ ] Critical service information translated and reviewed.
- [ ] Language switching works.
- [ ] Missing translations have a fallback.

---

# 7. Admin Dashboard

- [ ] Admin login works.
- [ ] Admin routes are protected.
- [ ] Admin permissions are checked server-side.
- [ ] Categories can be created and edited.
- [ ] Business listings can be created and edited.
- [ ] Events can be created and edited.
- [ ] Draft content remains private.
- [ ] Published content appears publicly.
- [ ] Images can be uploaded.
- [ ] Invalid uploads are rejected.
- [ ] Important changes are auditable.

---

# 8. Mobile and PWA Testing

Nomads Pipa should be designed primarily for mobile usage.

### Responsive testing

- [ ] Small mobile screens.
- [ ] Standard mobile screens.
- [ ] Large mobile screens.
- [ ] Tablets.
- [ ] Desktop.

### Browser testing

- [ ] iOS Safari.
- [ ] Android Chrome.
- [ ] Desktop Chrome.
- [ ] Desktop Safari.
- [ ] Firefox, where practical.

### PWA readiness

- [ ] Web app manifest configured.
- [ ] App name configured.
- [ ] App icons configured.
- [ ] Theme colour configured.
- [ ] Installability tested.
- [ ] Offline behaviour understood.
- [ ] Cached content does not show misleading outdated information.

A basic offline experience is sufficient for the first release. Full offline functionality is not required.

---

# 9. Performance and Accessibility

### Performance

- [ ] Images optimised.
- [ ] Images use appropriate responsive sizes.
- [ ] Unnecessary JavaScript removed.
- [ ] Database queries reviewed.
- [ ] Long lists use pagination or incremental loading.
- [ ] Loading states prevent confusing delays.
- [ ] Production performance checked on mobile connections.

### Accessibility

- [ ] Text has sufficient contrast.
- [ ] Buttons have clear labels.
- [ ] Images have meaningful alternative text.
- [ ] Forms have associated labels.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Information is not communicated through colour alone.
- [ ] Interactive controls have adequate touch targets.

---

# 10. Legal and Trust Requirements

Before launch, review:

- [ ] Privacy policy.
- [ ] Terms of use.
- [ ] Cookie and analytics disclosures, where applicable.
- [ ] Business listing publication permissions.
- [ ] Image and content usage rights.
- [ ] Partner participation terms.
- [ ] Contact form data handling.
- [ ] LGPD obligations.
- [ ] Sponsored placement disclosure.

Avoid presenting a business as an official partner unless that relationship has been agreed.

Do not guarantee third-party service quality, availability, prices, or bookings unless the platform has a verified basis for doing so.

---

# 11. Partner Readiness

### Initial partner onboarding

- [ ] Identify initial partner businesses.
- [ ] Explain what Nomads Pipa offers.
- [ ] Collect accurate business information.
- [ ] Confirm publication permission.
- [ ] Review descriptions and images.
- [ ] Explain how users contact the business.
- [ ] Confirm partner contact person.
- [ ] Provide a process for updating information.

### Partner communication

Prepare a short introduction explaining:

- What Nomads Pipa is.
- Who uses the platform.
- How listings work.
- What benefits partners receive.
- How businesses can participate.
- How to request corrections.

### Important

The first release does not require every partner to have a dashboard. A manually managed onboarding process is acceptable while the partner portal is being developed.

---

# 12. Analytics and Monitoring

### Basic analytics

- [ ] Homepage visits tracked.
- [ ] Category views tracked.
- [ ] Business detail views tracked.
- [ ] Contact clicks tracked.
- [ ] Event detail views tracked.
- [ ] Search usage tracked, if available.
- [ ] Privacy implications reviewed.

### Technical monitoring

- [ ] Production errors monitored.
- [ ] Failed requests investigated.
- [ ] Database health reviewed.
- [ ] Deployment status monitored.
- [ ] Backup status reviewed.
- [ ] A process for reporting bugs exists.

### Initial success metrics

| Metric             | What to measure                   |
| ------------------ | --------------------------------- |
| Active users       | People using the platform         |
| Business views     | Interest in local listings        |
| Contact clicks     | Potential business leads          |
| Event views        | Interest in local activities      |
| Category usage     | Most useful discovery sections    |
| Search failures    | Missing information opportunities |
| Returning visitors | Repeat usage                      |

Do not equate visits or contact clicks with confirmed sales.

---

# 13. Soft Launch

<badge color="info">Recommended before public launch</badge>

Start with a limited group of users and local partners.

### Soft-launch checklist

- [ ] Invite a small test group.
- [ ] Share the platform with initial partners.
- [ ] Test on real mobile devices.
- [ ] Ask users to find a business.
- [ ] Ask users to find an event.
- [ ] Ask users to locate an essential service.
- [ ] Check contact links with partners.
- [ ] Collect usability feedback.
- [ ] Record bugs.
- [ ] Fix critical issues.
- [ ] Review content accuracy.

### Questions for testers

1. Was it clear what Nomads Pipa offers?
2. Could you find the category you needed?
3. Were the business details useful?
4. Could you find what was happening locally?
5. Was anything difficult to use on mobile?
6. What information was missing?

Prioritise problems that prevent users from completing important tasks.

---

# 14. Public Launch

### Before announcement

- [ ] Production domain works.
- [ ] Homepage content is final.
- [ ] Main categories are populated.
- [ ] Business listings are checked.
- [ ] Events are current.
- [ ] Essential services are verified.
- [ ] Admin access is tested.
- [ ] Analytics are working.
- [ ] Privacy and terms pages are accessible.
- [ ] Mobile experience is approved.
- [ ] Support contact is available.

### Launch communication

Prepare:

- [ ] Instagram announcement.
- [ ] WhatsApp announcement.
- [ ] Partner announcement message.
- [ ] Short product introduction.
- [ ] QR code or direct website link.
- [ ] Basic instructions for using Nomads Pipa.

### First-week activities

- [ ] Monitor errors daily.
- [ ] Check user feedback.
- [ ] Review popular categories.
- [ ] Identify missing listings.
- [ ] Correct outdated information.
- [ ] Speak with initial partners.
- [ ] Document improvement requests.

---

# 15. Post-Launch Priorities

After the discovery MVP has been validated, prioritise the next product modules.

| Priority | Feature              | Purpose                                     |
| -------- | -------------------- | ------------------------------------------- |
| 1        | User accounts        | Personalised experience                     |
| 2        | Partner applications | Scale business onboarding                   |
| 3        | Partner dashboard    | Self-service management                     |
| 4        | QR Traffic Router    | Connect digital activity to physical visits |
| 5        | Quest Tree           | Encourage local exploration                 |
| 6        | Points and inventory | Reward engagement                           |
| 7        | Voucher wallet       | Make benefits redeemable                    |
| 8        | Staff scanner        | Verify redemptions                          |
| 9        | Flash Drops          | Create limited-time partner campaigns       |
| 10       | Analytics            | Demonstrate partner value                   |

Only move to the next major module when the current release is stable and its main user journeys are working.

---

# 16. Go / No-Go Decision

Use this section before approving the public release.

## Go criteria

- [ ] Critical technical checks pass.
- [ ] Security and permissions are tested.
- [ ] No known critical bugs.
- [ ] Main user journeys work.
- [ ] Initial content is accurate.
- [ ] Mobile experience is functional.
- [ ] Production deployment is stable.
- [ ] Privacy and legal pages are available.
- [ ] Support contact is ready.

## No-Go conditions

Do not proceed with public launch if:

- Private user or business data is exposed.
- Unauthorised users can edit public content.
- Critical pages are broken.
- Essential service information is materially inaccurate.
- Production deployment is unstable.
- Important user data is being collected without an appropriate privacy process.

---

# 17. Launch Sign-Off

Complete this section when the release is approved.

| Responsibility         | Name | Status  |
| ---------------------- | ---- | ------- |
| Product approval       |      | Pending |
| Technical approval     |      | Pending |
| Content approval       |      | Pending |
| Security review        |      | Pending |
| Partner readiness      |      | Pending |
| Public launch approval |      | Pending |

**Release version:** 1.0  
**Target launch date:** To be confirmed  
**Actual launch date:** To be completed  
**Production URL:** To be added

---

# 18. Final Launch Principle

Nomads Pipa should launch when its core discovery experience is reliable, useful, and trustworthy.

The first release does not need every planned feature.

It needs to help someone discover a business, find an event, access a useful service, or connect with the local community.

**Build trust first. Build engagement second. Scale the ecosystem third.**
