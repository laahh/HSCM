# HSECM Tingkat I — Quarter 2 2026 Hero

Awwwards-style animated hero section for the HSECM Q2 2026 banner, rebuilt as
an interactive Next.js page: layered navy/gold brand gradient, staggered
Framer Motion text reveals, scroll parallax, and a React Three Fiber
"achievement orb" centerpiece (glass sphere, gold rings, orbiting site-asset
icons, sparkles) that tilts toward the cursor.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- Framer Motion — entrance/staggered animations, scroll parallax
- React Three Fiber + drei — the 3D orb scene

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `components/hero/Hero.tsx` — composition + text content + stagger animation
- `components/hero/AchievementOrb.tsx` — the R3F canvas / 3D scene (client-only, dynamically imported with `ssr: false`)
- `components/hero/ParallaxBackground.tsx` — scroll-linked gradient blobs
- `components/hero/ColorDots.tsx`, `BrandBar.tsx` — banner detail pieces (category dots, logo/hashtag bar)

## Notes

- The 3D scene's lighting is built from `@react-three/drei`'s `Environment` +
  `Lightformer` (procedural, no external HDRI fetch) rather than
  `Environment preset="..."`, which downloads an HDR file from a CDN — keep it
  that way if this is built/run somewhere without outbound network access.
- No source image assets (the trophy photo / mining-site photo from the
  original banner) were available to this build, so the "achievement orb"
  centerpiece and the hero section overall are an original composition in the
  same spirit as 21st.dev / awwwards-style hero sections, not a copy of a
  specific third-party component — swap in real photography via `next/image`
  if you have the brand assets.
