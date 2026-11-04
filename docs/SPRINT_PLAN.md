# Sprint Plan

**Project:** Nomads Pipa  
**File:** `docs/SPRINT_PLAN.md`
**Status:** Proposed  
**Development approach:** Solo developer  
**Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase

---

## 1. Purpose

This document translates the product roadmap into practical development tasks.

It defines:

- Sprint goals.
- Development priorities.
- Task dependencies.
- Expected deliverables.
- Acceptance criteria.
- Definition of Done.

The initial plan covers:

- Sprint 0: Project setup and technical foundation.
- Sprint 1: Database and application structure.
- Sprint 2: Homepage and navigation.
- Sprint 3: Business directory.
- Sprint 4: Events and essential services.
- Sprint 5: Admin content management.
- Sprint 6: Testing and first MVP release.

Each sprint should produce a working application increment.

## 2. Working Method

### Task priorities

| Priority | Meaning                          |
| -------- | -------------------------------- |
| P0       | Blocks development or MVP launch |
| P1       | Important for the current sprint |
| P2       | Useful improvement               |
| P3       | Can wait                         |

### Task status

Use these statuses in your project tracker:

- Backlog
- Ready
- In Progress
- Blocked
- In Review
- Done

### Recommended workflow

1. Select one task.
2. Check its dependencies.
3. Implement the smallest complete version.
4. Test it locally.
5. Commit the changes.
6. Update documentation.
7. Move to the next task.

Avoid starting multiple complex features simultaneously.

---

# SPRINT 0 — Project Setup

<badge color="success">Foundation</badge>

**Goal:** Create a working development environment.

**Estimated effort:** 1–3 days.

### Tasks

| ID    | Task                            | Priority | Status  |
| ----- | ------------------------------- | -------- | ------- |
| S0-01 | Create Git repository           | P0       | Backlog |
| S0-02 | Create Next.js application      | P0       | Backlog |
| S0-03 | Configure TypeScript            | P0       | Backlog |
| S0-04 | Configure Tailwind CSS          | P0       | Backlog |
| S0-05 | Install shadcn/ui               | P0       | Backlog |
| S0-06 | Create Supabase project         | P0       | Backlog |
| S0-07 | Configure environment variables | P0       | Backlog |
| S0-08 | Connect Supabase client         | P0       | Backlog |
| S0-09 | Configure ESLint and formatting | P1       | Backlog |
| S0-10 | Create initial project README   | P1       | Backlog |

### Implementation notes

Use the current stable Next.js App Router setup.

Recommended project structure:

```text
nomads-pipa/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── styles/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── product/
├── architecture/
├── .env.example
├── package.json
└── README.md
```

Keep feature-specific components inside `features/` rather than placing all application code in one components folder.

### Environment variables

Create `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key must only be used in trusted server-side environments. Never expose it through client-side code or a `NEXT_PUBLIC_` variable.

### Acceptance criteria

- Application starts locally.
- TypeScript compiles.
- Tailwind styles work.
- shadcn/ui components can be added.
- Supabase connection succeeds.
- Environment variables are configured.
- Repository contains no secrets.

**Sprint deliverable:** Working Next.js and Supabase foundation.

---

# SPRINT 1 — Database and Application Structure

**Goal:** Create the first database schema and the shared application structure.

**Estimated effort:** 2–4 days.

### Tasks

| ID    | Task                               | Priority | Status  |
| ----- | ---------------------------------- | -------- | ------- |
| S1-01 | Review DATABASE.md                 | P0       | Backlog |
| S1-02 | Create database migration files    | P0       | Backlog |
| S1-03 | Create categories table            | P0       | Backlog |
| S1-04 | Create businesses table            | P0       | Backlog |
| S1-05 | Create business tags               | P1       | Backlog |
| S1-06 | Create events table                | P1       | Backlog |
| S1-07 | Configure foreign keys and indexes | P0       | Backlog |
| S1-08 | Configure initial RLS policies     | P0       | Backlog |
| S1-09 | Create development seed data       | P1       | Backlog |
| S1-10 | Create shared application layout   | P0       | Backlog |
| S1-11 | Create reusable navigation         | P0       | Backlog |
| S1-12 | Create shared UI components        | P1       | Backlog |

### Suggested migration order

Create tables in dependency order:

1. Profiles, if required by the initial schema.
2. Categories.
3. Businesses.
4. Business tags.
5. Business-tag relationships.
6. Events.

Create referenced tables before tables that depend on them.

### Initial UI components

- Button.
- Card.
- Badge.
- Input.
- Select.
- Dialog.
- Sheet.
- Skeleton.
- Empty state.
- Error message.

### Acceptance criteria

- Migrations apply successfully.
- Foreign keys work.
- RLS is enabled where required.
- Public visitors can read only published public content.
- Unauthorised users cannot modify directory records.
- Shared layout works on mobile.

**Sprint deliverable:** Initial database and application shell.

---

# SPRINT 2 — Homepage and Navigation

**Goal:** Create the main Nomads Pipa discovery experience.

**Estimated effort:** 2–4 days.

### Tasks

| ID    | Task                          | Priority | Status  |
| ----- | ----------------------------- | -------- | ------- |
| S2-01 | Create homepage route         | P0       | Backlog |
| S2-02 | Build homepage hero section   | P1       | Backlog |
| S2-03 | Build category navigation     | P0       | Backlog |
| S2-04 | Display featured businesses   | P1       | Backlog |
| S2-05 | Display upcoming events       | P1       | Backlog |
| S2-06 | Display active offers section | P2       | Backlog |
| S2-07 | Add search entry point        | P1       | Backlog |
| S2-08 | Build mobile navigation       | P0       | Backlog |
| S2-09 | Add loading states            | P1       | Backlog |
| S2-10 | Add empty states              | P1       | Backlog |

### Homepage content hierarchy

Recommended order:

1. Brand and primary navigation.
2. Welcome message.
3. Search or discovery entry point.
4. Main category grid.
5. Featured local businesses.
6. Today's events.
7. Useful services.
8. Community and partner CTA.

The homepage should make all major categories discoverable without requiring users to scroll through an excessively long page.

### Acceptance criteria

- Homepage loads successfully.
- All primary categories are visible or immediately accessible.
- Featured businesses come from the database.
- Event previews show published events only.
- Mobile navigation is usable.
- Empty content does not cause layout errors.

**Sprint deliverable:** Working discovery homepage.

---

# SPRINT 3 — Business Directory

**Goal:** Allow users to explore businesses and discover places based on their needs.

**Estimated effort:** 3–5 days.

### Tasks

| ID    | Task                                  | Priority | Status  |
| ----- | ------------------------------------- | -------- | ------- |
| S3-01 | Create category listing route         | P0       | Backlog |
| S3-02 | Create business listing route         | P0       | Backlog |
| S3-03 | Create business detail route          | P0       | Backlog |
| S3-04 | Build business card component         | P0       | Backlog |
| S3-05 | Display business images               | P1       | Backlog |
| S3-06 | Display business contact links        | P1       | Backlog |
| S3-07 | Implement contextual tags             | P1       | Backlog |
| S3-08 | Implement category filters            | P1       | Backlog |
| S3-09 | Add pagination or incremental loading | P2       | Backlog |
| S3-10 | Add metadata and SEO basics           | P1       | Backlog |

### Initial categories

- Food & Drink.
- Accommodation.
- Transportation.
- Events & Community.
- Sports & Activities.
- Essential Services.
- Community & Give Back.

### Initial contextual tags

- Remote Work Friendly.
- Wi-Fi.
- Power Outlets.
- Vegan Options.
- Daily Meal / PF.
- Sunset Views.
- Live Music.
- Date Night.
- Weekday Nightlife.

### Business detail page

Each business page should support:

- Business name.
- Category.
- Description.
- Images.
- Location.
- Contact buttons.
- Social links.
- Opening hours, when verified.
- Relevant tags.
- Active offers, when available.

### Acceptance criteria

- Users can browse categories.
- Users can open business details.
- Filters return relevant listings.
- Only published businesses are publicly visible.
- Missing optional fields do not break layouts.
- Contact links work on mobile.

**Sprint deliverable:** Functional public business directory.

---

# SPRINT 4 — Events and Essential Services

**Goal:** Add the practical information that makes Nomads Pipa useful every day.

**Estimated effort:** 2–4 days.

### Tasks

| ID    | Task                                   | Priority | Status  |
| ----- | -------------------------------------- | -------- | ------- |
| S4-01 | Create events listing page             | P0       | Backlog |
| S4-02 | Build event cards                      | P0       | Backlog |
| S4-03 | Create event detail page               | P1       | Backlog |
| S4-04 | Implement event type labels            | P1       | Backlog |
| S4-05 | Add event date filtering               | P2       | Backlog |
| S4-06 | Create essential services page         | P0       | Backlog |
| S4-07 | Create service categories              | P1       | Backlog |
| S4-08 | Add verified contact information       | P1       | Backlog |
| S4-09 | Add emergency information presentation | P0       | Backlog |

### Event types

Use consistent labels:

- Nomads Pipa Meet-up.
- Community Pick.
- City Event.

These labels must communicate who organises or endorses an event. Do not label third-party events as official Nomads Pipa events.

### Essential services categories

- Emergency Contacts.
- Healthcare.
- Dental Services.
- Veterinary Care.
- Repairs.
- Couriers.
- Laundry.
- Beauty and Wellness.
- Immigration Information.
- Pix Guidance.

### Acceptance criteria

- Users can browse upcoming events.
- Event types are clearly distinguishable.
- Event details display local time.
- Essential service categories are accessible.
- Emergency information is easy to locate.
- Important contact information is reviewed before publication.

**Sprint deliverable:** Events and essential services directory.

---

# SPRINT 5 — Basic Admin Content Management

**Goal:** Make it possible to maintain the directory without manually changing database records.

**Estimated effort:** 3–5 days.

### Tasks

| ID    | Task                                 | Priority | Status  |
| ----- | ------------------------------------ | -------- | ------- |
| S5-01 | Define admin role                    | P0       | Backlog |
| S5-02 | Protect admin routes                 | P0       | Backlog |
| S5-03 | Create admin dashboard               | P1       | Backlog |
| S5-04 | Create category management           | P1       | Backlog |
| S5-05 | Create business management           | P0       | Backlog |
| S5-06 | Create event management              | P1       | Backlog |
| S5-07 | Implement draft and published states | P0       | Backlog |
| S5-08 | Add image upload                     | P1       | Backlog |
| S5-09 | Add basic validation                 | P0       | Backlog |
| S5-10 | Record important admin actions       | P2       | Backlog |

### Admin functionality

Admins should be able to:

- Create categories.
- Edit categories.
- Create businesses.
- Edit business details.
- Publish and unpublish businesses.
- Create events.
- Edit event details.
- Publish and cancel events.
- Upload approved images.

### Acceptance criteria

- Admin routes require authentication.
- Admin role is verified server-side.
- Non-admin users cannot access admin actions.
- Draft content is not publicly visible.
- Published changes appear in the directory.
- Image uploads are validated.

**Sprint deliverable:** Basic content management dashboard.

---

# SPRINT 6 — MVP Testing and Launch

**Goal:** Prepare the discovery product for real users and initial partner onboarding.

**Estimated effort:** 2–4 days, potentially longer if issues are discovered.

### Tasks

| ID    | Task                            | Priority | Status  |
| ----- | ------------------------------- | -------- | ------- |
| S6-01 | Test homepage                   | P0       | Backlog |
| S6-02 | Test category navigation        | P0       | Backlog |
| S6-03 | Test business pages             | P0       | Backlog |
| S6-04 | Test event pages                | P0       | Backlog |
| S6-05 | Test admin permissions          | P0       | Backlog |
| S6-06 | Test RLS policies               | P0       | Backlog |
| S6-07 | Test mobile browsers            | P0       | Backlog |
| S6-08 | Check page performance          | P1       | Backlog |
| S6-09 | Review SEO metadata             | P1       | Backlog |
| S6-10 | Prepare initial content         | P0       | Backlog |
| S6-11 | Configure production deployment | P0       | Backlog |
| S6-12 | Complete soft-launch checklist  | P0       | Backlog |

### Acceptance criteria

- No critical navigation issues.
- No unauthorised content editing.
- No private information exposed.
- Public pages work on mobile.
- Initial directory content is verified.
- Production deployment is stable.
- Basic monitoring is available.

**Sprint deliverable:** Discovery MVP ready for soft launch.

---

# 4. Backlog — After Discovery MVP

The following work should remain outside the initial sprints.

| Feature                      | Planned phase        |
| ---------------------------- | -------------------- |
| User profiles and onboarding | Accounts phase       |
| Partner applications         | Accounts phase       |
| Partner dashboard            | Accounts phase       |
| QR generation and scanning   | Traffic Router phase |
| Quest Tree                   | Gamification phase   |
| Points and achievements      | Gamification phase   |
| Inventory                    | Gamification phase   |
| Voucher wallet               | Rewards phase        |
| Staff scanner redemption     | Rewards phase        |
| Flash Drops                  | Partner growth phase |
| Partner analytics            | Partner growth phase |
| Transportation decision flow | Expansion phase      |
| Concierge packages           | Expansion phase      |
| Community Picks              | Expansion phase      |
| Portuguese translations      | Expansion phase      |

Do not pull these into the discovery sprints unless a dependency or validated business need requires it.

---

# 5. Weekly Solo-Developer Routine

A practical weekly structure:

| Day       | Focus                                 |
| --------- | ------------------------------------- |
| Monday    | Planning and technical implementation |
| Tuesday   | Main feature development              |
| Wednesday | Main feature development              |
| Thursday  | Integration and bug fixes             |
| Friday    | Testing, documentation, and release   |

Adjust this schedule to your actual availability. A sprint should finish when its acceptance criteria are met, not simply because the calendar week ended.

---

# 6. Definition of Done

A task can be marked Done when:

- [ ] The feature works as described.
- [ ] TypeScript checks pass.
- [ ] Relevant lint checks pass.
- [ ] Validation is implemented.
- [ ] Loading and error states are handled.
- [ ] Mobile layout is tested.
- [ ] Permissions are enforced.
- [ ] Relevant tests pass.
- [ ] No secrets are exposed.
- [ ] Documentation is updated.
- [ ] Changes are committed to Git.

For database tasks, also verify:

- [ ] Migration applies successfully.
- [ ] Foreign keys and indexes are correct.
- [ ] RLS policies are tested.
- [ ] Seed data is safe for the development environment.

---

# 7. Suggested Git Workflow

Use a simple branch structure:

```text
main
├── develop
├── feature/homepage
├── feature/business-directory
├── feature/events
└── feature/admin-dashboard
```

Suggested commit format:

```text
feat: add homepage category navigation
feat: implement business detail page
fix: correct event timezone display
chore: configure supabase client
docs: update sprint plan
```

Merge completed features into the integration branch after testing. Only release verified changes to `main`.

---

# 8. Initial Content Preparation

Content preparation is a parallel workstream, not something to postpone until the application is finished.

Prepare:

- [ ] Category names and descriptions.
- [ ] Initial business list.
- [ ] Business contact details.
- [ ] Business images and usage permissions.
- [ ] Contextual business tags.
- [ ] Initial event listings.
- [ ] Essential service contacts.
- [ ] English content.
- [ ] Portuguese translations for important pages.

Do not publish unverified opening hours, emergency numbers, prices, or partner offers.

---

# 9. First Release Success Criteria

The first public release is successful when:

1. A visitor can understand what Nomads Pipa offers.
2. A visitor can find relevant local businesses.
3. A visitor can discover upcoming events.
4. A visitor can access useful essential services.
5. A partner can provide information for a listing.
6. An authorised admin can maintain public content.
7. The application works reliably on mobile.

The first release does not need the complete Traffic Router or loyalty system.

---

# 10. Immediate Next Actions

Start with these five tasks:

1. Create the Next.js repository.
2. Configure TypeScript, Tailwind CSS, and shadcn/ui.
3. Connect the Supabase project.
4. Review and implement the initial database migrations.
5. Build the shared application layout.

**Important:** Finish Sprint 0 before starting substantial feature development. A clean foundation will make the later QR, quest, voucher, and partner systems much easier to implement.
