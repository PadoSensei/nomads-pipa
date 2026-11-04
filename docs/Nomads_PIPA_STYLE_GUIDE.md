# Nomads Pipa: Style Guide & Design Spec

**For:** LLM / developer building the mobile app in Next.js + Tailwind CSS + shadcn/ui
**Source:** Brand palette board, 6 mobile screen mockups, UI component sheet, circular logo badge

---

## 1. Product & Brand Vibe

**What it is:** A community-and-concierge mobile app for digital nomads and travellers in **Pipa, Brazil** (Praia da Pipa, Rio Grande do Norte). Core jobs: find a place to stay, meet the community, see what's happening today, explore local spots, get a ride, and chat with an assistant (or a real person).

**Brand keywords:** Vibrant. Fresh. Community-driven. Warm. Welcoming. Adventurous. Clean. Modern. Easy to use. Inclusive.

**Personality:** A friendly local who's lived in Pipa for years: relaxed but organised, social, knows the good spots. Never corporate, never touristy-cliché.

**Explicit brief from the palette board:** _"Inspired by Pipa's natural beauty... brings energy and warmth while staying clean, modern and easy to use. It feels welcoming, adventurous and inclusive, without relying on stereotypical 'tropical' clichés."_

**What this means in practice**

- Deep ocean green as the confident anchor; bright teal, sun yellow and coral used as _accents_, not floods of colour.
- Warm sand/cream backgrounds instead of stark white. It feels sunlit, not clinical.
- Real photography (golden-hour beaches, cliffs, palm trees, beach bars, dinner tables full of people) carries the emotion. UI chrome stays quiet and clean.
- Rounded, soft, friendly shapes everywhere. No sharp corners, no heavy borders.
- **Avoid:** neon gradients, coconut/flamingo/hibiscus decoration, cartoon surf imagery, busy patterns, drop-shadow-heavy skeuomorphism, dark mode "hacker" aesthetics.

---

## 2. Colour Palette

| Token      | Name                    | Hex       | HSL          | Role                                                             |
| ---------- | ----------------------- | --------- | ------------ | ---------------------------------------------------------------- |
| `ocean`    | Ocean Green (Primary)   | `#073F3B` | 176 80% 14%  | Navigation, headers, primary buttons, active nav icons           |
| `lagoon`   | Lagoon Teal (Secondary) | `#00A896` | 174 100% 33% | Highlights, accents, icons, "Meet-up" tags                       |
| `sun`      | Sun Yellow (Accent)     | `#F5C842` | 45 90% 61%   | Events, highlights, tags, ratings stars                          |
| `coral`    | Coral (Accent)          | `#FF6B4A` | 11 100% 65%  | Calls to action, active states, secondary button, map "hot" pins |
| `sand`     | Sand (Background)       | `#FFF6EB` | 33 100% 96%  | Main app background, cards                                       |
| `charcoal` | Charcoal (Text)         | `#1F2937` | 215 28% 17%  | Text, icons, body copy                                           |
| `mist`     | Soft Gray               | `#E5E7EB` | 220 13% 91%  | Borders, dividers, disabled states                               |

**Supporting tints observed in the mockups (derive, don't hard-code unless matching exactly)**

- Teal tint for quick-action tiles: ~`#DDF3EF` (lagoon at ~12–15% on sand/white) with a thin teal border.
- Coral/peach tint for quick-action tiles: ~`#FFE6DC` (coral at ~12–15%) with a thin coral border.
- Yellow tint for "Good to know" callout card: ~`#FFF3D1` (sun at ~20%).
- Map land colour: soft sage green (~`#CFE7C3`), water: light aqua (~`#9ADBD4`), roads white. Keep the map soft and desaturated so pins pop.
- Pure white (`#FFFFFF`) is used inside cards/sheets on top of sand, and for text on photos/dark green.

**Colour usage rules**

1. **Ocean Green** = authority and action. Primary buttons, header text, selected chips, the big "Get me a ride" CTA bar, active tab.
2. **Coral** = energy and urgency. Secondary CTA, active-state highlights, "What's happening?" tile, map pins for popular spots, the "Sunset" tag.
3. **Lagoon Teal** = friendly interaction. Icons, "Meet-up" tags, "Find a place to stay" / "Meet the community" tiles, online status.
4. **Sun Yellow** = events and delight. Event tags, stars, calendar icon, the sun in the logo.
5. **Sand** is the page background. Cards are white or sand-tinted with a subtle border/shadow.
6. **Charcoal** for all text (never pure black). Secondary text = charcoal at ~60–65% opacity.
7. **Soft Gray** for borders, dividers, disabled states, inactive chips.
8. Keep ratio roughly **60% sand/white, 20% ocean green, 10% teal, 10% yellow + coral combined**.

**Accessibility notes (important, check these in implementation)**

- White on Ocean Green: excellent (~12:1).
- Charcoal on Sand, Yellow, or Coral: good (Coral ~5:1, Yellow ~9:1). **Use charcoal text on yellow and coral tags/buttons where text is small.**
- White on Coral (~2.8:1) and white on Lagoon Teal (~3:1) are _below_ AA for small text. Mockup uses white on coral for the secondary button label; keep it **bold ≥16px** or switch to charcoal / a slightly darker coral (`#E8502F`) if small.
- Lagoon Teal and Sun Yellow on white/sand are for **icons, large text, fills**, not body text.
- Touch targets ≥ 44×44px. Visible focus ring (see tokens below).

---

## 3. Typography

| Use          | Font                                        | Notes                                                                                                                                          |
| ------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Headlines    | **Sora** (or similar modern geometric sans) | Semibold/Bold, slightly tight tracking. Hero headline in photo overlay is large, bold, white, with a subtle text shadow/gradient scrim behind. |
| Body         | **Inter** (or similar clean sans)           | Regular 400, line-height ~1.5                                                                                                                  |
| UI / Buttons | **Inter Medium (500)**                      | Labels, chips, tabs, buttons                                                                                                                   |

**Suggested scale (mobile)**

- Hero display: 32–36px / 1.1, Sora 700 (e.g. "Feel at home in Pipa.")
- Screen title (H1): 24px, Sora 700, Ocean Green (e.g. "Community Picks")
- Section / card title (H2): 18–20px, Sora 600
- Card title (H3): 16px, Inter/Sora 600
- Body: 14–16px Inter 400, charcoal
- Secondary/meta: 12–13px Inter 400–500, charcoal/60
- Chip / tag: 11–12px Inter 500–600
- Bottom nav label: 10–11px Inter 500

Load via `next/font/google`: `Sora` → `--font-sora`, `Inter` → `--font-inter`.

---

## 4. Logo & Brand Elements

Two logo treatments are provided:

1. **Wordmark (app header / hero / palette board):** "NOMADS PIPA" in a hand-drawn, chunky, rounded, playful display lettering, stacked on two lines ("NOMADS" over "PIPA"), with a small **sun burst icon** beside "PIPA" (yellow disc with rays). Used in Ocean Green on light backgrounds, white on photos.
2. **Circular badge (avatar, app icon, favicon, splash, social):** Deep green circle (~`#064A3F`, a touch lighter than the UI primary, so sample from the file) containing white chunky "NOMADS PIPA" lettering, **three yellow concentric arcs (Wi-Fi/signal motif, referencing remote work and connection)** above the text, and a **white palm tree silhouette** bleeding off the lower-right edge of the circle.

**Brand rules**

- Don't redraw or re-font the logo. Use the supplied image/SVG assets.
- Clear space around wordmark ≥ height of the "N".
- On photos: use the white version with a dark gradient scrim for legibility.
- The signature combo **sun + Wi-Fi arcs + palm** says: "sun, sea, and good internet", the nomad promise.

**Brand icon set (circular badges, 56px, on the palette board)**

- Home → Ocean Green circle, white icon
- Community (people) → Lagoon Teal circle, white icon
- Events (calendar) → Sun Yellow circle, charcoal icon
- Location (pin) → Coral circle, white icon
- Local/leaf (nature/wellness) → pale teal circle, teal icon

Icon style: **outline/line icons**, ~1.75–2px stroke, rounded caps and joins, simple geometry. Use **lucide-react** (ships with shadcn): `Home`, `Users`, `Calendar`, `MapPin`, `Heart`, `MoreHorizontal`, `Car`, `Utensils`, `Search`, `SlidersHorizontal`, `ArrowRight`, `ChevronRight`, `Star`, `Footprints`/`PersonStanding`, `Send`, `Lightbulb`, `Sprout`/`Leaf`.

---

## 5. Layout, Shape & Elevation

**Canvas:** Mobile-first, design at **390×844** (iPhone 14/15 class). Max content width ~430px; centre on larger screens with sand background. Horizontal page padding **20px**. Vertical rhythm on a **4px grid** (common steps: 8 / 12 / 16 / 20 / 24 / 32).

**Corner radii**

- Buttons: **full pill** (`rounded-full`)
- Search bar: pill / `rounded-full` (white, soft shadow)
- Chips / tags: pill
- Cards: **20–24px** (`rounded-2xl` to `rounded-3xl`)
- Quick-action tiles: **16–20px**
- Photo thumbnails inside cards: 12–16px
- Bottom sheets: 24–28px top corners
- Phone-frame hero images: bottom corners overlapped by a rounded sheet

**Elevation:** Very soft. Cards use a 1px border `mist` or a faint shadow (`0 4px 20px rgba(7,63,59,0.08)`). Floating elements (search bar, map locate button, chat send button) get slightly stronger shadow (`0 8px 24px rgba(7,63,59,0.12)`). No hard dark shadows.

**Imagery:** Full-bleed hero photos with the content sheet sliding over them (rounded top corners, sand/white background). Photos are warm, golden-hour, people-in-context. Apply a gradient scrim (`from-black/40 to-transparent`) behind overlaid text.

---

## 6. Navigation

**Bottom tab bar (persistent, 5 items):** Home · Map · Community · Saved · More

- White/sand background, top hairline border (`mist`), safe-area padding.
- Icon (24px) + 10–11px label.
- **Active:** Ocean Green icon + label (label semibold); inactive: charcoal at ~50%.
- Community tab is highlighted when on Community Picks.

**Top bars:** Back arrow (left) · screen title (Sora 600) · optional filter icon button (right) in a rounded-square/circular ghost button.

---

## 7. Screen-by-Screen Specs

### 7.1 Home

- **Hero:** Full-bleed coastal photo (cliffs, palms, beach) ~45% screen height. Wordmark top-left, hamburger menu top-right (white).
- **Headline** over photo: "Feel at home in Pipa." (white, Sora bold, large) + subline "Local knowledge. Real connections." (white, 15–16px).
- **Search bar** overlaps the hero/sheet boundary: white pill, search icon, placeholder "What are you looking for?"
- **2×2 quick-action grid** (rounded tiles, tinted fill + thin matching border, icon top-left, label, small arrow bottom-right):
  - Find a place to stay (teal tint, home icon)
  - Meet the community (teal tint, users icon)
  - What's happening? (coral tint, calendar icon)
  - Explore local spots (coral tint, pin icon)
- **Full-width primary CTA bar:** "Get me a ride", Ocean Green, white text, car icon left, arrow right, pill, ~56px tall.
- Bottom nav.

### 7.2 Explore Pipa (Map)

- Header: back arrow, "Explore Pipa", filter button.
- **Filter chips (horizontal scroll):** All (selected: Ocean Green fill, white text) · Food & Drink · Beaches · Bars (unselected: sand/white fill with `mist` border).
- **Map** fills the screen. Soft, pastel style. Place names in small charcoal text (Praia da Amor, Pipa, Praia do Madeiro). Pins: circular markers in **coral, yellow, teal/green** with white icons (fork & knife, star, etc.). Selected pin is larger. **Locate-me** floating white circle button bottom-right.
- **Bottom preview card** (white, rounded, overlapping the map): large photo with heart/save icon, name ("Sundara"), tags (Restaurant, Sunset) in coral/yellow tint pills, walking time ("5 min" with walker icon), trailing arrow.

### 7.3 Community Picks

- Hero photo header (sunset beach bar) with back arrow, menu; white sheet slides up.
- Title "Community Picks" (Sora bold) + subtitle "Top recommendations from the Nomads Pipa community: where you'll actually find people."
- **Segmented tabs:** Today (selected, Ocean Green pill) · This Week · All (light gray pills).
- **Event/pick cards:** left square photo thumbnail (rounded), right content:
  - Tag pill (**yellow** "Nomads Are Going", **teal** "Nomads Meet-up", **pale yellow/gray** "Recommended Event")
  - Title (e.g. "Sunset Drinks & Good Vibes", "Community Dinner", "Live Music – Bossa & Jazz")
  - Meta rows with small icons: clock + time ("Today · 5:30 PM"), pin + venue
  - Trailing chevron
- Cards: white, rounded-2xl, subtle border, 12px padding, 12–16px gap between.

### 7.4 Find a Place to Stay

- Hero photo of a balcony/pool view with back arrow and filter button.
- Search bar "Where would you like to stay?"
- **Category chips:** All · Hostels · Pousadas · Apartments.
- **Listing cards:** large photo (rounded top), heart (save) button top-right (white circle; red/coral when saved), then:
  - Name ("Pousada da Praia"), location + walking distance ("Praia do Amor · 2 min walk")
  - Rating: yellow star, "4.8 (120)"
  - Price right-aligned: "From **$45** / night"
  - Feature tag pill: "Best for remote work" (teal/green tint, small icon)

### 7.5 Nomads Pipa Assistant (Chat)

- Header: circular sun-logo avatar, "Nomads Pipa Assistant", green dot + "Online", overflow icon.
- Assistant bubble: soft gray/sand-gray, rounded (larger radius, small tail corner), "Hi! I'm your Nomads Pipa assistant. How can I help you today?" with the small sun icon at left.
- **Suggested-reply buttons** (stacked, full width, outlined/white, rounded-xl, icon left in teal):
  - Find a place to stay · Get me a ride · Where to eat & drink · What's happening today? · Local tips & recommendations · Talk to a real person
- **Input bar:** pill text field "Type your message…" + circular **Ocean Green send button** with white paper-plane icon.
- User bubbles (not shown, so infer): Ocean Green background, white text, mirrored radius.

### 7.6 UI Components Sheet

- **Buttons (all full-width pill, ~52–56px, Inter Medium 16px, trailing arrow icon):**
  - **Primary:** Ocean Green fill, white text
  - **Secondary:** Coral fill, white text (see accessibility note)
  - **Outline:** white/transparent fill, 2px Lagoon Teal or Ocean Green border, Ocean Green text
- **Tags/chips:** Event (yellow fill, charcoal text), Meet-up (teal fill, white text), Recommended (light gray fill, charcoal text, small chevron).
- **"Good to know" callout card:** pale-yellow fill, thin yellow border, lightbulb icon in a yellow circle, title "Good to know", body "This is a community recommendation.", trailing chevron.
- **Place card (compact):** photo left (rounded), title "Sunset at Praia do Amor", pin + "5 min walk", chevron right.

---

## 8. Component Inventory (map to shadcn/ui)

| Need                                 | shadcn component                  | Customisation                                                                            |
| ------------------------------------ | --------------------------------- | ---------------------------------------------------------------------------------------- |
| Buttons (primary/secondary/outline)  | `Button`                          | Add variants `primary`, `secondary` (coral), `outline`; size `lg` = `h-14 rounded-full`  |
| Chips / filters                      | `ToggleGroup` or `Badge` + button | `rounded-full`, selected = ocean fill                                                    |
| Segmented tabs (Today/This Week/All) | `Tabs` or `ToggleGroup`           | Pill style                                                                               |
| Tags                                 | `Badge`                           | Variants: `event` (sun), `meetup` (lagoon), `recommended` (mist), `popular` (coral tint) |
| Cards                                | `Card`                            | `rounded-2xl border-mist bg-white shadow-card`                                           |
| Search                               | `Input` + icon                    | `h-12 rounded-full bg-white shadow-float pl-11`                                          |
| Bottom nav                           | custom                            | Fixed, safe-area aware                                                                   |
| Bottom sheets                        | `Drawer` (vaul)                   | `rounded-t-3xl`                                                                          |
| Chat bubbles, quick replies          | custom                            | See 7.5                                                                                  |
| Avatar                               | `Avatar`                          | Circular logo badge                                                                      |
| Skeletons / toasts                   | `Skeleton`, `Sonner`              | Sand-tinted shimmer                                                                      |
| Save / heart                         | `Toggle`                          | Coral fill when active                                                                   |

---

## 9. Implementation Tokens

### 9.1 `globals.css` (shadcn CSS variables, HSL without `hsl()` wrapper)

```css
@layer base {
  :root {
    --background: 33 100% 96%; /* sand #FFF6EB */
    --foreground: 215 28% 17%; /* charcoal #1F2937 */

    --card: 0 0% 100%;
    --card-foreground: 215 28% 17%;
    --popover: 0 0% 100%;
    --popover-foreground: 215 28% 17%;

    --primary: 176 80% 14%; /* ocean #073F3B */
    --primary-foreground: 0 0% 100%;

    --secondary: 11 100% 65%; /* coral #FF6B4A */
    --secondary-foreground: 0 0% 100%; /* use charcoal if small text */

    --muted: 220 13% 91%; /* mist #E5E7EB */
    --muted-foreground: 215 16% 40%;

    --accent: 174 100% 33%; /* lagoon #00A896 */
    --accent-foreground: 0 0% 100%;

    --sun: 45 90% 61%; /* #F5C842 */
    --sun-foreground: 215 28% 17%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 174 100% 33%; /* teal focus ring */

    --radius: 1.25rem; /* 20px base */
  }
}
```

### 9.2 `tailwind.config.ts` extension

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        ocean: { DEFAULT: "#073F3B" },
        lagoon: { DEFAULT: "#00A896", tint: "#DDF3EF" },
        sun: { DEFAULT: "#F5C842", tint: "#FFF3D1" },
        coral: { DEFAULT: "#FF6B4A", tint: "#FFE6DC", dark: "#E8502F" },
        sand: { DEFAULT: "#FFF6EB" },
        charcoal: { DEFAULT: "#1F2937" },
        mist: { DEFAULT: "#E5E7EB" },
        // shadcn semantic tokens
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 4px 20px rgba(7,63,59,0.08)",
        float: "0 8px 24px rgba(7,63,59,0.12)",
      },
      spacing: { "safe-b": "env(safe-area-inset-bottom)" },
    },
  },
};
export default config;
```

### 9.3 Example class recipes

```txt
Primary CTA:   h-14 w-full rounded-full bg-ocean text-white font-medium flex items-center justify-between px-6
Secondary CTA: h-14 w-full rounded-full bg-coral text-white font-semibold
Outline btn:   h-14 w-full rounded-full border-2 border-lagoon text-ocean bg-transparent
Chip (on):     h-9 px-4 rounded-full bg-ocean text-white text-sm font-medium
Chip (off):    h-9 px-4 rounded-full bg-white border border-mist text-charcoal text-sm
Tag Event:     rounded-full bg-sun text-charcoal text-[11px] font-semibold px-2.5 py-1
Tag Meet-up:   rounded-full bg-lagoon text-white text-[11px] font-semibold px-2.5 py-1
Tag Recommend: rounded-full bg-mist text-charcoal/80 text-[11px] font-medium px-2.5 py-1
Card:          rounded-2xl bg-white border border-mist shadow-card p-3
Quick tile:    rounded-2xl border p-4 h-28 (teal: bg-lagoon/10 border-lagoon/30; coral: bg-coral/10 border-coral/30)
Search:        h-12 rounded-full bg-white shadow-float pl-11 pr-4 text-sm placeholder:text-charcoal/50
Callout:       rounded-2xl bg-sun/20 border border-sun/50 p-4 flex gap-3
```

---

## 10. Interaction & Motion

- **Tap feedback:** scale to 0.98 + slight brightness change, 120ms ease-out.
- **Sheets/drawers:** spring slide-up 250–300ms. Hero image parallax-collapses on scroll.
- **Chip selection:** background cross-fade 150ms.
- **Save (heart):** quick scale-pop (1 → 1.2 → 1) and fill to coral.
- **Map pins:** selected pin scales up with a soft bounce; preview card slides up from bottom.
- **Chat:** messages fade/slide in from 8px below; typing indicator = three teal dots.
- Keep motion subtle, friendly, fast. Respect `prefers-reduced-motion`.

---

## 11. Content & Voice

- Warm, second-person, plain English. Short sentences. Light local flavour but no forced slang.
- Examples from the mockups: "Feel at home in Pipa.", "Local knowledge. Real connections.", "Where you'll actually find people.", "Good to know".
- Always show human context: _Nomads Are Going_, _Community Dinner_, _Best for remote work_.
- Time format: "Today · 5:30 PM". Walking distance: "5 min walk". Price: "From $45 / night".
- Offer a human fallback ("Talk to a real person") in the assistant.

---

## 12. Do / Don't Cheat Sheet

**Do**

- Use sand as the base, white for cards, Ocean Green for key actions.
- Use pill shapes, generous padding (16–20px), and 12–16px gaps.
- Lead screens with a real, warm photo; keep chrome minimal.
- Use outline icons with rounded ends, coloured by role (teal/coral/yellow).
- Pair every tag with meaning (colour is a category cue, not decoration).
- Keep one primary CTA per screen.

**Don't**

- Don't use pure black, pure white page backgrounds, or heavy gray.
- Don't put small white text on yellow, or small teal text on white.
- Don't stack more than two accent colours in one component.
- Don't add stock "tropical" motifs (hibiscus, tiki, surfboard clipart).
- Don't use square corners or 1px-sharp-edged cards.
- Don't over-shadow. Keep elevation soft and green-tinted.

---

## 13. Notes for the Implementing LLM

- Stack: **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + lucide-react**. Mobile-first PWA-style layout with a fixed bottom tab bar and safe-area handling (`viewport-fit=cover`).
- Build shared primitives first (Button variants, Badge variants, Card, Chip, SearchBar, BottomNav, ListingCard, EventCard, ChatBubble, QuickTile), then compose screens.
- All colours must come from tokens above. Do not introduce new hexes without noting them.
- Photos: use `next/image` with `fill` + `object-cover`, rounded containers, and gradient scrims for text overlays.
- Hex values for the seven core colours are exact (from the palette board); tints, map colours and the badge's green are visually estimated from the mockups and should be tuned against the final assets.
