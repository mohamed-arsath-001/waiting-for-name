# Design Brief

## Direction

Zestflow — Premium creative agency platform with deep burgundy aesthetic and vibrant red accents, optimized for luxury brand positioning and high-end service showcase.

## Tone

Editorial luxury with warm undertones; sophisticated burgundy-wine foundation with bright red highlights create confidence and creative energy without appearing corporate or cold.

## Differentiation

Sticky card stack scroll animation (Brix Agency style) paired with premium typography creates a distinctive, immersive product showcase experience that rewards careful scrolling.

## Color Palette

| Token      | OKLCH            | Role                                    |
| ---------- | ---------------- | --------------------------------------- |
| background | 0.14 0.04 15     | Deep burgundy-black, page foundation    |
| foreground | 0.92 0.01 60     | Warm off-white, primary text            |
| card       | 0.18 0.05 15     | Opaque card surfaces, slightly elevated |
| primary    | 0.35 0.08 15     | Rich wine tone, subtle interactive      |
| accent     | 0.58 0.25 25     | Vibrant red (#ff3b2e equivalent)        |
| muted      | 0.22 0.04 15     | Darker burgundy for disabled/secondary  |
| border     | 0.28 0.05 15     | Subtle burgundy dividers                |

## Typography

- Display: Lora — elegant serif for feature titles and numbers, italicized for emphasis
- Body: DM Sans — refined sans-serif for descriptions and labels
- Scale: hero `text-4xl md:text-6xl font-bold`, h2 `text-2xl md:text-4xl`, body `text-base md:text-lg`

## Elevation & Depth

Opaque cards with premium drop shadows (20–50px blur radius) create layered depth; cards scale (0.95) and darken slightly as they stack to reinforce the 3D effect of overlapping layers.

## Structural Zones

| Zone             | Background        | Border           | Notes                                          |
| ---------------- | ----------------- | ---------------- | ---------------------------------------------- |
| Page background  | card (0.18)       | —                | Deep burgundy, consistent dark base            |
| Feature cards    | card (0.18)       | subtle accent    | Opaque, solid, no transparency bleed           |
| Accent highlights| accent (0.58)     | —                | Red (#ff3b2e equivalent) for CTAs/numbers     |
| Text on cards    | foreground (0.92) | —                | Warm off-white for maximum contrast            |

## Spacing & Rhythm

Section gaps 80–120px; card internal padding 32–48px; micro-spacing (4–8px) between labels and content; consistent rhythm across desktop and mobile.

## Component Patterns

- Cards: 12px rounded corners, opaque dark backgrounds, box-shadow 20–50px blur
- Typography: Lora display (700 bold) for numbers, DM Sans body (400–500) for copy
- Accents: Vibrant red used sparingly on feature tags and highlight elements
- Hover: Light scale (1.02) and shadow elevation on card interaction

## Motion

- Entrance: Cards fade-in and slide up on scroll trigger (0.6s ease-out)
- Scroll stacking: Locked to scroll position; card 1 scales to 0.95 as card 2 overlays; smooth scrubbing via GSAP ScrollTrigger or Intersection Observer
- Decorative: Subtle parallax on card backgrounds at different scroll speeds

## Constraints

- No transparency bleed (all cards fully opaque with solid backgrounds)
- Mobile: graceful degradation to vertical fade-up stack instead of complex scroll animation
- Accent red (#ff3b2e) used only for highlights, never as background
- Minimum contrast: 4.5:1 for AA+ accessibility between foreground/background pairs

## Signature Detail

Deep burgundy palette with bright red accents creates a luxury aesthetic distinct from tech blues and greens; sticky card stack animation rewards deliberate interaction and creates narrative pacing through the feature showcase.
