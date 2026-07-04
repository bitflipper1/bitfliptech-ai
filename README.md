# bitfliptech.ai

**Human-centered AI for complex systems.** The next chapter of bitfliptech.com — a cinematic AI-product studio site: AI lab + design studio + command center + digital art piece.

## Stack

- **Vite + React + TypeScript** — builds to plain static files
- **React Three Fiber / Three.js** — GLSL shader particle field hero (cursor-reactive, lazy-loaded)
- **Lenis** — smooth scrolling (disabled under `prefers-reduced-motion`)
- Hand-rolled design system in plain CSS, no frameworks

## Brand system

- Colors: near-black `#050505`, electric cyan `#22e0ff`, acid green `#b4f542`, deep violet `#8b5cf6`, warm white `#f5f2ec` — all in `src/index.css` as CSS variables
- Type: Space Grotesk (brutalist uppercase headlines) + IBM Plex Mono (system labels)
- Motifs: bit-flip decode animation, scanlines, command-center grid, network nodes, glitch hovers

## Structure

- `src/data/content.ts` — **all site copy**: hero, services, lab cards, capabilities, story, timeline, process, contact
- `src/components/ParticleField.tsx` — WebGL hero animation
- `src/components/useDecode.ts` — 0/1 bit-flip text decode effect
- `src/components/CapabilityMap.tsx` — interactive SVG network graph
- `src/components/Lab.tsx` — experiment cards with glitch hover states
- `src/components/Timeline.tsx` — 2009 → now client history

## Develop

```sh
npm install
npm run dev
```

## Deploy to Hostinger

This site is fully static — no Node server needed in production.

1. `npm run build` → output lands in `dist/`
2. **Option A (Git deploy):** in hPanel → Websites → Advanced → Git, connect this repo, set build command `npm install && npm run build` and publish directory `dist`
3. **Option B (manual):** upload the contents of `dist/` to `public_html` via hPanel File Manager or FTP
4. Point the `bitfliptech.ai` domain at the site and enable Hostinger's free SSL

No Hostinger AI Builder / Horizons layer is required — this codebase already is the custom layer, and Hostinger's AI visual tools (image generation, upscaling, heatmaps) can still be used for production assets.
