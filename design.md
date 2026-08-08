---
version: "alpha"
name: "Synthwave"
description: "Synthwave landing page with dramatic neon sunset gradients and retro-futuristic 80s aesthetics. Ideal for capas de álbuns, promoções de marca, visuais neon, eventos de música eletrônica. AI-ready template."
colors:
  primary: "#FF6B35"
  secondary: "#FF1493"
  tertiary: "#2D1B69"
  neutral: "#1B1464"
  surface: "#00FFFF"
  accent: "#C0C0C0"
typography:
  h1:
    fontFamily: Orbitron
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: Orbitron
    fontSize: 1rem
    fontWeight: 400
spacing:
  sm: 2.0rem
  md: 4.0rem
  lg: 8.0rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px
---

## Overview

Synthwave landing page with dramatic neon sunset gradients and retro-futuristic 80s aesthetics. Ideal for capas de álbuns, promoções de marca, visuais neon, eventos de música eletrônica. AI-ready template. Synthwave didn't emerge from a vacuum — it crawled out of late-2000s internet culture, where bedroom producers on Bandcamp and SoundCloud started obsessively reconstructing the sonic palette of 1980s film scores. Vangelis, Tangerine Dream, Jan Hammer — these were the patron saints. But the visual language mattered just as much as the music. The aesthetic crystallized around VHS tracking lines, chrome typography, and that impossibly saturated magenta-to-cyan gradient sky that never existed in any real sunset.

What makes Synthwave interesting as a design movement is its relationship with nostalgia for something most practitioners never experienced firsthand. It's a fantasy of the '80s filtered through Drive (2011), Kavinsky's "Nightcall," and the pixel art of early Hotline Miami. The grid receding into a horizon line, the palm tree silhouettes, the DeLorean — these aren't memories, they're constructed mythology.

The palette is deceptively narrow but emotionally potent. Deep navy and black backgrounds create depth. Neon pinks, electric blues, and hot magentas provide the energy. Chrome and holographic accents add that crucial sense of expensive futurism. When it works, it feels like driving through a city that only exists at 2 AM.

- Density: 5/10 — Balanced
- Variance: 7/10 — Dynamic
- Motion: 8/10 — Cinematic

- **Style:** Neon Sunset, Retro-Futuristic, Grid, Arcade
- **Keywords:** Synthwave, neon sunset, retro-futuristic, grid lines, palm trees, arcade, 80s electronic, outrun, monoline neon, chrome
- **Era:** 1980s Retro-Futurism Revival
- **Light/Dark:** ✗ Not Recommended / ✓ Full

## Colors

- **Sunset Orange** (#FF6B35) — Warm accent, call-to-action secondary
- **Neon Pink** (#FF1493) — Primary text color
- **Deep Purple** (#2D1B69) — Accent color, emphasis elements
- **Horizon Blue** (#1B1464) — Accent highlight, links and focus states
- **Neon Cyan** (#00FFFF) — Secondary accent
- **Chrome Silver** (#C0C0C0) — Extended palette, decorative use
- **Hot Magenta** (#FF00FF) — Decorative accent, highlight elements
- **Dark Navy** (#0A0A2E) — Deep contrast surface


## Typography

- **Display / Hero:** Orbitron — Weight 700, tight tracking, used for headline impact
- **Body:** Orbitron — Weight 400, 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** Orbitron — 0.875rem, weight 500, slight letter-spacing
- **Monospace:** JetBrains Mono — Used for code, metadata, and technical values

Scale:
- Hero: clamp(2.5rem, 5vw, 4rem)
- H1: 2.25rem
- H2: 1.5rem
- Body: 1rem / 1.6
- Small: 0.875rem


## Layout

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(4rem, 8vw, 8rem).
- **Hero layout:** Asymmetric composition.
- **Feature sections:** Asymmetric grid with varied card sizes. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. No horizontal overflow.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).


## Elevation & Depth

Neon grid perspective floor (CSS 3D transform), sunset gradient sky backgrounds, neon monoline borders (1-2px with glow), palm tree silhouette SVG decorations, chrome text effects, retro scanline overlay, pulsing neon glow animations

- **Physics:** Spring — stiffness 120, damping 20. Confident, weighted transitions.
- **Entry animations:** Fade + translate-Y (16px → 0) over 540ms ease-out. Staggered cascades for lists: 120ms between items.
- **Hover states:** Scale(1.03) + shadow lift over 200ms.
- **Page transitions:** Fade + slide (300ms).
- **Performance:** Only transform and opacity animated. No layout-triggering properties.


## Shapes

Base corner radius: 8px. See rounded tokens in front matter for the full scale.


## Components

- **Primary Button:** Subtly rounded (0.5rem) shape. Accent color fill. Hover: 8% darken + subtle lift shadow. Active: -1px translate tactile press. Font weight 600. No outer glows.
- **Secondary / Ghost Button:** Outline variant. 1.5px border in muted color. Text in primary color. Hover: subtle background fill.
- **Cards:** Subtly rounded (0.5rem) corners. Surface background. Subtle shadow (0 2px 12px rgba(0,0,0,0.06)). 1px border stroke.
- **Inputs:** Label above input. 1px border stroke. Focus ring: 2px accent color offset 2px. Error text below in semantic red. No floating labels.
- **Navigation:** Primary surface background. Active item: accent color indicator. Font weight 500 when active.
- **Skeletons:** Shimmer animation matching component dimensions. No circular spinners.
- **Empty States:** Icon-based composition with descriptive text and action button.


## Do's and Don'ts

- No emojis in UI — use icon system only (Lucide, Heroicons)
- No pure white (#FFFFFF) backgrounds — use off-white or dark surfaces
- No oversaturated accent colors (saturation cap: 80%)
- No 3-column equal-width feature layouts — use zig-zag or asymmetric grid
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos

- Do Sunset gradient sky background
- Do Neon perspective grid floor
- Do Neon monoline borders with glow
- Do Palm tree SVG silhouettes
- Do Chrome/metallic text effects
- Do Retro scanline overlay
- Do Bold futuristic typography
- Do Responsive with maintained neon atmosphere


## Use Case

Album covers, Brand promotions, Neon visuals, Electronic music events
