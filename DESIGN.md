# Speeir Design System

Reference for the visual language of speeir.com. Source of truth is
[tailwind.config.js](tailwind.config.js) + [src/lib/utils.ts](src/lib/utils.ts) —
this file explains *why* and *where*, the code holds the values.

---

## Color

All colors are Tailwind theme keys. Never hardcode a hex in a component;
add it here and in `tailwind.config.js` first.

| Token | Hex | Role |
|---|---|---|
| `primary` | `#A15FDC` | Brand purple. Eyebrows, links, icon chips, accents, focus rings. Also the PWA `themeColor`. |
| `amber` | `#D4A043` | Secondary accent. Only appears in gradient washes (card glow, blog covers). Never as text. |
| `ink` | `#14181C` | Body text, headings, and the dark CTA pill / dark sections. |
| `surface` | `#F3F4F8` | Page background (`html, body` in globals.css). |
| `void` | `#110D18` | Deepest purple-black. Blog cover gradients only. |
| `muted` | `#6B7480` | Secondary copy, footer links, card body text. |
| `border` | `#C7CDD6` | Hairlines — almost always at reduced alpha (`border-border/40`). |
| `white` | `#FFFFFF` | Card and panel surfaces sitting on `surface`. |

### Usage rules

- **Two surfaces, alternating.** Page is `surface` (grey); content panels and
  cards are `white`. Sections alternate between the two to create rhythm —
  a plain `py-20` section, then a `rounded-3xl bg-white` panel.
- **One dark break per page, max.** `bg-ink` in a `rounded-3xl` panel (see the
  tech-stack section on the homepage). Inside it, text goes `text-white` and
  `text-white/60`; chips are `bg-white/10`.
- **Borders are always faded.** `border-border/40` for structure,
  `border-border/60` for interactive controls (inputs, secondary buttons).
- **Primary is tinted, not filled.** Icon chips are `bg-primary/10 text-primary`.
  Solid `bg-primary` is not used anywhere — the filled CTA is `bg-ink`.
- **Hover shadows carry brand color:** `hover:shadow-[0_8px_40px_-8px_rgba(161,95,220,0.18)]`.

---

## Typography

- **Family:** Geist Sans via `next/font/google`, wired as `--font-geist-sans`
  → `font-sans`. One family, no serif, no mono pairing.
- **Weights:** `font-semibold` (600) for every heading and button.
  `font-bold` only for stat numbers. Body is default weight.
- **Headings are tight:** always `tracking-tight`; the h1 also takes
  `leading-[1.1]` and `text-balance`.

| Element | Classes |
|---|---|
| Hero h1 | `text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-ink` |
| Page h1 | `text-4xl md:text-5xl font-semibold tracking-tight text-ink` |
| Statement h2 | `text-3xl md:text-5xl font-semibold tracking-tight` |
| Section h2 | `text-3xl md:text-4xl font-semibold tracking-tight text-ink` |
| Card h3 | `text-lg font-semibold text-ink` |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.2em] text-primary` |
| Lead copy | `text-base md:text-lg leading-relaxed text-muted` |
| Card copy | `text-sm leading-relaxed text-muted` |

The eyebrow is a component, not a class chain — use `<Eyebrow>` from
[primitives.tsx](src/components/ui/primitives.tsx). Long-form markdown uses
`PROSE_CLASS` (the `@tailwindcss/typography` plugin, re-tinted to brand colors).

---

## Layout

### Shell

`RootLayout` → `<body class="flex min-h-full flex-col">` → `SiteChrome`
(Header · `<main class="flex-1">` · Footer). `/admin` and `/login` opt out of
chrome entirely.

The header is `fixed` and takes no flow space. Pages clear it with their own
`py-20/28`; on mobile that's shorter than the 96px bar, so `main` adds
`pt-12 lg:pt-0`. **The homepage is the exception** — its hero runs full-bleed
*under* the transparent bar by design, so `isHome` skips the padding.

### Container

`container` is centered with `1rem` padding, no max-width override — Tailwind's
default breakpoint widths apply. Inner content clamps itself:
`max-w-2xl` for centered section intros, `max-w-3xl` for hero/statement copy,
`max-w-4xl`/`max-w-5xl` for grids.

### Section rhythm

Two forms, alternating down the page:

```tsx
{/* Plain section — sits directly on the grey page */}
<section className="py-20 md:py-28">
  <div className="container">…</div>
</section>

{/* Panel section — inset white/dark slab with rounded corners */}
<section className="p-4 md:p-6">
  <div className="rounded-3xl bg-white py-20 md:py-28">
    <div className="container">…</div>
  </div>
</section>
```

The outer `p-4 md:p-6` is what gives the panel its floating margin. Vertical
rhythm is always `py-20 md:py-28` — do not invent new section paddings.

### Grids

| Content | Grid |
|---|---|
| Service cards | `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` |
| Stats | `grid gap-6 sm:grid-cols-2 lg:grid-cols-4` |
| Value props | `grid gap-8 md:grid-cols-3` (max-w-4xl, centered) |
| Footer | `grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]` |

### Radii

`rounded-3xl` section panels · `rounded-2xl` cards and icon chips ·
`rounded-xl` small icon chips · `rounded-lg` inputs · `rounded-full` buttons,
pills, avatars, the navbar.

---

## Components

### Buttons

Two shared constants in `src/lib/utils.ts` — import them, don't retype the chain
(it had already drifted into six near-identical variants):

- `CTA_CLASS` — dark pill, `px-7 py-3`, `hover:-translate-y-0.5`
- `CTA_SM_CLASS` — same, `px-5 py-2.5`

Secondary button is inline, not a constant: `rounded-full border border-border/60
bg-white px-7 py-3.5 text-sm font-semibold text-ink` with
`hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md`.
Every CTA carries a trailing `<ArrowRight size={16} />`.

### Cards

Two flavors:

- **Content card** (`ServiceCard`, `CTACard`): `rounded-2xl border border-border/40
  bg-white p-7 shadow-md`, hover lifts border to `primary/30` plus a purple glow.
- **Glass card** (`ui/damn-good-card.tsx`): `bg-surface/90` + `backdrop-blur-xl`
  + inset white highlight + grain overlay. Used for stats.

The hover glow is a shared primitive — `<Glow />` — an absolutely positioned
`bg-primary/10 blur-xl` layer that fades in on the parent `group`.

### Header

`ui/resizable-navbar.tsx`. Transparent full-width bar that, past 100px of
scroll, springs into an 800px `bg-white/80 backdrop-blur` floating pill.
Desktop `lg:` and up; below that a mobile sheet. Nav links live in
[Header.tsx](src/components/Header.tsx); mobile flattens any dropdown children.

### Footer

Four columns (brand blurb + Services + Company + Connect), a legal row, then
the giant `TextHoverEffect` "Speeir" wordmark masked with a
`linear-gradient(to_bottom, black 45%, transparent 92%)` so it dissolves into
the page edge instead of ending on a hard cut.

### Forms

`INPUT_CLASS` — `rounded-lg border border-border/60 px-4 py-2.5 text-sm`,
focus swaps the border to `primary`. No focus glow, no ring.

---

## Texture & background effects

The site's signature is layered texture over flat color:

- **`MeshGradient`** — WebGL simplex-noise shader, white/lavender base with
  slow purple blobs and white streaks. Homepage hero only. Caps DPR at 1.5 and
  freezes time (`u_t = 0`) under `prefers-reduced-motion`.
- **`GRAIN_STYLE`** — inline SVG `feTurbulence` fractal noise, tiled at 180px.
  Applied at `opacity-[0.04]` with `mix-blend-overlay` over glass and gradient
  surfaces. Shared constant, not a per-component data URI.
- **`BackgroundBeams`** / **`BackgroundLines`** — animated SVG line fields
  behind dark and white panels respectively.
- **Blog cover fallbacks** — `bg-cover-1/2/3`, each a self-contained stack of
  two brand radials over a `void`/`ink` base, so consumers need no extra
  background-position or -size classes.

---

## Motion

Framer Motion, used sparingly.

- **Entrance:** `initial={{ opacity: 0, y: 20-24 }}` → `animate/whileInView`,
  `duration: 0.5`, stagger `delay: index * 0.08`.
  Easing for scroll reveals: `[0.16, 1, 0.3, 1]`.
- **Scroll reveals** always use `viewport={{ once: true, margin: "-80px" }}` —
  fire once, slightly before entering the fold.
- **Hover:** `-translate-y-0.5` lift plus a shadow. `transition-all duration-300`.
- **Navbar:** spring, `stiffness: 200, damping: 50`.
- **Keyframes** in the Tailwind config: `move` (3s float) and `twinkle` (2.8s).

### Reduced motion

Non-negotiable, handled in two places:

1. `globals.css` clamps every animation/transition to `0.01ms` under
   `prefers-reduced-motion: reduce`.
2. Components that animate meaningfully check it in JS — `useReducedMotion()`
   in `GlassHero` (drops the fade entirely), `matchMedia` in `MeshGradient`
   (freezes the shader clock).

---

## Accessibility

- Every decorative layer (grain, glow, mesh canvas, beams) carries
  `aria-hidden="true"` and `pointer-events-none`.
- Icon-only links (footer socials) need an `aria-label`.
- The FAQ accordion is native `<details>/<summary>` — keyboard and screen
  reader behavior comes free; `marker:content-none` hides the default triangle.
- Body copy floor is `text-sm` on `muted` against `white`/`surface`. Don't
  fade `muted` further with opacity.

---

## Conventions

- **`cn()`** (clsx + tailwind-merge) for every conditional or overridable class.
- **Class chains repeated 3+ times become a constant** in `src/lib/utils.ts`;
  repeated *markup* becomes a component in `ui/primitives.tsx`.
- **Icons:** `@phosphor-icons/react`. Server components import from
  `@phosphor-icons/react/dist/ssr`. Decorative icons use `weight="duotone"`.
- **Content lives in `src/data/`** (services, stats, faqs, social, process),
  never inline in a page — except page-local copy like homepage value props.
