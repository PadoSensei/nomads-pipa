# Nomads Pipa — Accessibility & Responsive Experience QA

**Document:** `docs/ACCESSIBILITY_RESPONSIVE_QA.md`
**Task Reference:** NP-019 (Milestone M0 — Foundation & Developer Workflow)
**Standard Reference:** WCAG 2.2 Level AA Target
**Status:** Living Engineering Standard & Audit Baseline

---

## 1. Executive Summary & Audit Scope

This document establishes the accessibility and responsive quality baseline for Nomads Pipa. The product is mobile-first, designed for digital nomads, remote workers, and local residents in Praia da Pipa, Brazil. It must remain fully usable across devices, screen sizes, assistive technologies (screen readers), and keyboard-only navigation.

### 1.1 Pages & Components Audited

This audit covers exclusively the currently implemented routes and shared components as of Milestone M0:

| Category | Item | Route / Component Path | Status |
| :--- | :--- | :--- | :--- |
| **Pages** | Home / Explore Hub | `app/page.tsx` (`/`) | Implemented |
| **Pages** | Categories Directory | `app/categories/page.tsx` (`/categories`) | Implemented |
| **Pages** | Category Details (Dynamic) | `app/category/[slug]/page.tsx` (`/category/[slug]`) | Implemented |
| **Pages** | Events Calendar (Preview) | `app/events/page.tsx` (`/events`) | Implemented |
| **Pages** | Community & Initiatives | `app/community/page.tsx` (`/community`) | Implemented |
| **Pages** | About Us | `app/about/page.tsx` (`/about`) | Implemented |
| **Pages** | Become a Partner (Preview) | `app/partner/page.tsx` (`/partner`) | Implemented |
| **Shared Layout** | Root Layout | `app/layout.tsx` | Implemented |
| **Shared Layout** | App Header | `components/layout/AppHeader.tsx` | Implemented |
| **Shared Layout** | Desktop Navigation | `components/layout/HeaderNavLinks.tsx` | Implemented |
| **Shared Layout** | Mobile Bottom Navigation | `components/layout/MobileBottomNav.tsx`, `MobileNavContent.tsx` | Implemented |
| **Shared Layout** | App Footer | `components/layout/AppFooter.tsx` | Implemented |
| **Shared Layout** | Placeholder Template | `components/layout/PlaceholderPage.tsx` | Implemented |
| **UI Primitives** | Button | `components/ui/button.tsx` | Implemented |
| **UI Primitives** | Badge | `components/ui/badge.tsx` | Implemented |
| **UI Primitives** | Card | `components/ui/card.tsx` | Implemented |
| **UI Primitives** | Avatar | `components/ui/avatar.tsx` | Implemented |
| **UI Primitives** | Carousel | `components/ui/carousel.tsx` | Implemented |

*Note: Future features such as Quests Tree (`/quests`), Staff Scanner (`/staff/scanner`), Voucher Wallet (`/wallet`), and Partner Dashboard (`/partner/dashboard`) are not yet implemented in the codebase and are therefore not audited as live pages. They must conform to the standards defined in Section 2 when developed.*

---

## 2. Practical Development Standards (WCAG 2.2 AA Target)

All future frontend features and components must adhere to the following baseline development criteria:

### 2.1 Keyboard Navigation & Focus Management
1. **Interactive Element Reachability:** Every link, button, input, toggle, and dialog trigger must be reachable and actionable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`).
2. **Visible Focus Indicators:** Never set `outline: none` without providing a distinct replacement. Use Tailwind's `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` or the default shadcn button focus rings.
3. **Bypass Navigation (Skip Link):** A "Skip to main content" link must be the very first focusable element in the DOM, targeting `<main id="main-content">` and becoming visible upon focus.
4. **Logical Tab Order:** The focus order must match the visual and reading flow (top-to-bottom, left-to-right).

### 2.2 Semantic HTML & Screen Reader Support
1. **Landmarks:** Every page must feature semantic landmarks: `<header>`, `<nav>`, `<main id="main-content">`, and `<footer>`.
2. **Heading Hierarchy:** Each page must have exactly one logical `<h1>`. Subsequent sections must descend in logical hierarchy (`<h2>`, then `<h3>`) without skipping levels.
3. **Active Page State:** Navigation items pointing to the active route must indicate current state using `aria-current="page"`.
4. **Accessible Names:** Icon-only buttons or ambiguous action triggers must provide an accessible text alternative using `<span className="sr-only">Description</span>` or `aria-label`.
5. **Meaningful Images:** All informative images must include descriptive `alt` text. Purely decorative icons/images must use `aria-hidden="true"`.

### 2.3 Responsive Layouts, Reflow & Touch Targets
1. **No Horizontal Scroll:** Pages must reflow seamlessly down to 320px viewport width without requiring horizontal scrolling or suffering content clipping.
2. **Mobile Touch Targets:** In touch-accessible navigation and primary actions, touch targets must meet a minimum size of **44 × 44 CSS pixels** (WCAG 2.2 Success Criterion 2.5.8 requires at least 24×24px; mobile iOS/Android guidelines mandate 44×44px or 48×48px).
3. **Viewport & Zoom:** The viewport meta tag must allow users to pinch-to-zoom (do not disable zoom via `maximum-scale=1.0` or `user-scalable=no`).

### 2.4 Contrast & Visual Presentation
1. **Text Contrast:** Regular text (< 18pt or < 14pt bold) must achieve a minimum contrast ratio of **4.5:1** against its background. Large text (≥ 18pt or ≥ 14pt bold) must achieve at least **3.0:1**.
2. **Interactive Elements:** Visual boundaries and UI icons required to identify interactive controls must achieve at least **3.0:1** contrast against adjacent backgrounds.
3. **No Color Alone:** Critical information, warnings, or statuses must not rely solely on color; accompany color cues with text, badges, or distinct iconography.

### 2.5 Motion Preferences
1. **Reduced Motion:** Respect the user's OS-level motion preference (`prefers-reduced-motion: reduce`). Transitions, rotations, and auto-scrolling animations should be muted or disabled using Tailwind's `motion-reduce:transition-none` or `motion-reduce:transform-none`.

---

## 3. Repeatable Manual QA Checklist

Before merging pull requests modifying or adding UI components, perform this 8-step manual verification:

- [ ] **1. Keyboard Tab Sequence:**
  - Press `Tab` upon initial page load: does the "Skip to main content" link appear visibly?
  - Press `Enter`: does focus advance directly into the main content area?
  - Continue tabbing through the entire page: is every interactive link and button reachable?
  - Is focus trapped or unexpectedly lost at any point?
- [ ] **2. Visible Focus Rings:**
  - As focus moves through links, buttons, and form elements, is the outline/ring clearly visible in both light mode and dark mode?
  - Does the focus ring have sufficient contrast against the background?
- [ ] **3. Screen Reader & Navigation Semantics:**
  - Inspect the navigation bar: does the active route have `aria-current="page"`?
  - Check icon-only elements (e.g. mobile navigation icons, carousel controls): do they announce their purpose (via text or `sr-only`)?
  - Run a heading outline check (e.g., via browser accessibility tree or HeadingsMap): is there a single `<h1>`, followed by `<h2>` and `<h3>` without skipping levels?
- [ ] **4. Small-Screen Reflow (320px - 390px):**
  - In browser devtools, resize viewport to 320px (iPhone SE narrow) and 390px (standard iPhone 14/15).
  - Check for any horizontal overflow or cut-off text.
  - Verify that grid layouts collapse gracefully to a single column.
- [ ] **5. Touch Target Sizes:**
  - Verify that all mobile navigation buttons, action chips, and cards have interactive hit areas of at least 44 × 44px.
  - Verify that adjacent buttons have sufficient clearance to prevent accidental taps.
- [ ] **6. Browser Zoom (200%):**
  - Zoom the browser page to 200%.
  - Ensure all text remains readable, cards do not overlap, and controls remain operational without broken text truncation.
- [ ] **7. Color Contrast Check:**
  - Test muted text (`text-muted-foreground`) and accent pills (`text-accent-foreground`) against card and page backgrounds using a contrast checker.
  - Check both light mode (`--background: oklch(...)`) and dark mode.
- [ ] **8. Reduced Motion:**
  - Emulate `prefers-reduced-motion: reduce` in browser rendering tools.
  - Check whether smooth animations, decorative rotations, or pulses are suppressed or simplified.

---

## 4. Audit Findings Grouped by Severity

### 4.1 Critical Severity (Blockers for Assistive Tech / Keyboard Users)

*None identified.* The base application is built with modern semantic tags and clean document structure.

---

### 4.2 High Severity (Major Usability & Accessibility Gaps)

| ID | Location | Description | Recommended Action | Resolution Status |
| :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | `app/layout.tsx` | **Missing Skip Navigation Link:** Keyboard-only users and screen-reader users must tab through the entire header navigation on every page before reaching main content. | Add an accessible Skip-to-content link targeting `<main id="main-content">` that is visually off-screen until focused. | **Fixed in NP-019** |
| **AUD-02** | `components/layout/MobileNavContent.tsx` | **Undersized Touch Target Area:** Mobile bottom navigation links had touch targets under 44px height (`py-1` container with `h-8` icon box), creating high risk of mis-taps on small devices. | Increase container height to minimum 44px (`min-h-[48px]`), ensuring full tap target meets standard mobile accessibility guidelines. | **Fixed in NP-019** |
| **AUD-03** | `components/layout/HeaderNavLinks.tsx`, `MobileNavContent.tsx` | **Missing `aria-current="page"` Indicator:** Active routes were distinguished purely by CSS styles (`bg-secondary`, `text-primary`), leaving screen readers unable to detect which page is active. | Add `aria-current={isActive ? "page" : undefined}` to all desktop and mobile navigation links. | **Fixed in NP-019** |

---

### 4.3 Medium Severity (Enhancements & Quality Improvements)

| ID | Location | Description | Recommended Action | Resolution Status |
| :--- | :--- | :--- | :--- | :--- |
| **AUD-04** | `components/layout/AppHeader.tsx`, `HeaderNavLinks.tsx`, `MobileNavContent.tsx` | **Focus Visibility on Nav Links:** Navigation links relied on default browser outlines that could be subtle on warm sand backgrounds. | Apply explicit `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` to navigation links. | **Fixed in NP-019** |
| **AUD-05** | `app/about/page.tsx`, `app/page.tsx`, `app/partner/page.tsx` | **Unused Component Imports & ESLint Warnings:** Unused icons (`Info`, `ShieldCheck`, `Search`, `ArrowRight`, `CheckCircle2`) triggered compiler/linter warnings. | Clean up dead imports across affected pages. | **Fixed in NP-019** |
| **AUD-06** | `components/layout/AppHeader.tsx` | **Motion Reduction on Logo Hover:** Brand icon had a rotation transition (`group-hover:rotate-45`) without respecting `motion-reduce`. | Add `motion-reduce:transform-none motion-reduce:transition-none`. | **Fixed in NP-019** |
| **AUD-07** | `app/globals.css` | **Color Contrast Tuning for Secondary Accents:** In certain dark mode conditions, secondary contrast should be verified against brand guidelines. | Brand tokens are owned by concurrent task NP-017. Documented for follow-up in NP-017. | **Deferred to NP-017** |
| **AUD-08** | Internationalization | **Language Attributes & Localized Aria Labels:** Future Portuguese translation will require dynamic `<html lang="...">` and translated ARIA labels. | Locale routing and messages are owned by concurrent task NP-016. Documented for follow-up in NP-016. | **Deferred to NP-016** |

---

### 4.4 Low Severity (Minor Polish & Consistency)

| ID | Location | Description | Recommended Action | Resolution Status |
| :--- | :--- | :--- | :--- | :--- |
| **AUD-09** | `components/layout/AppFooter.tsx` | **Footer Heading Structure:** Footer headings use `<h4>` directly under the page landmarks without intermediate `<h2>` or `<h3>`. | Standardize footer navigation headings or wrap in `<nav aria-label="Footer">`. | **Deferred to follow-up** |
| **AUD-10** | `components/ui/carousel.tsx` | **Live Region Announcements:** Embla carousel controls have accessible button labels (`sr-only`), but dynamic slide changes could benefit from aria-live announcements for screen readers. | Add aria-live status when carousel is populated with dynamic remote data. | **Deferred to component integration** |

---

## 5. Concurrent Task Boundaries & Deferred Issues

To prevent conflicts and regressions with concurrent tasks NP-016 and NP-017:

1. **NP-016 (Internationalization & Locale Routing):**
   - *Boundary:* Did not touch locale routing, message files, or language selector components.
   - *Observation:* `<html lang="en">` is currently hardcoded in `app/layout.tsx`. NP-016 should dynamically inject the active locale into the `lang` attribute and provide localized accessible labels for navigation landmarks and skip links.
2. **NP-017 (Brand Foundations & Token System):**
   - *Boundary:* Did not touch `app/globals.css`, font configs in `layout.tsx`, or color token definitions.
   - *Observation:* Brand tokens in `globals.css` provide accessible contrast for primary ocean teal and warm sand in light mode. Contrast in accent chips (`text-accent-foreground`) should be validated whenever palette tweaks occur in NP-017.

---

## 6. Testing Guidance for Future Contributors

### 6.1 Automated Checks
Run the complete automated verification suite before submitting code:
```bash
# 1. Linter checks (zero errors and warnings)
pnpm lint

# 2. Type checks
pnpm typecheck

# 3. Unit & accessibility tests
pnpm test

# 4. Production build
pnpm build
```

### 6.2 Adding Accessibility Tests
When adding new pages or interactive widgets, add corresponding tests under `tests/unit/`:
- Test for accessible landmarks (`role="main"`, `role="navigation"`, `role="banner"`).
- Test for `aria-current="page"` on active navigation elements.
- Test for accessible names on buttons and icon controls (`getByRole('button', { name: /.../i })`).
- Test keyboard interactions (`userEvent.tab()`, `userEvent.keyboard('{Enter}')`).

### 6.3 Browser DevTools Testing
- **Chrome DevTools / Lighthouse:** Open DevTools > Lighthouse > Select "Accessibility" > Run audit. Aim for 100% on all public routes.
- **Axe DevTools / Wave:** Run the axe DevTools browser extension on mobile and desktop viewports to catch contrast or markup regressions.
- **Screen Reader Testing:** Verify primary flows with VoiceOver (macOS / iOS) or NVDA / TalkBack (Windows / Android).
