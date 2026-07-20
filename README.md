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

## The Console

`⌘K` (or `Ctrl+K`, or the nav button) opens the BitFlip Console anywhere on the
site. Two tiers:

- **Local protocols** (no backend): archive queries ("restaurant sites from 2012",
  "fuel pizza"), `services`, `process`, `story`, `flips`, `strata`, `go <page>`,
  and `start project` (drafts an inquiry email). All deterministic, instant, free.
- **AI core** (optional): free-form questions answered by Claude via a Cloudflare
  Worker so the API key never reaches the browser. Deploy
  [worker/console-worker.js](worker/console-worker.js) (instructions in the file,
  ~10 minutes), then set the worker URL as the `CONSOLE_ENDPOINT` repo variable
  (GitHub → Settings → Secrets and variables → Actions → Variables) and redeploy.
  Until then the console reports "AI core: offline — local protocols active."

## Deploy

This site is fully static — no Node server needed in production.

**Staging (automatic):** every push to `main` deploys to GitHub Pages via
`.github/workflows/deploy-pages.yml` → https://bitflipper1.github.io/bitfliptech-ai/

**Production (Hostinger), pick one:**

1. **GitHub Action (recommended):** add repo secrets `HOSTINGER_FTP_SERVER`,
   `HOSTINGER_FTP_USERNAME`, `HOSTINGER_FTP_PASSWORD` (from hPanel → Files → FTP
   Accounts), then run the "Deploy to Hostinger (FTP)" workflow from the Actions tab.
2. **hPanel Git deploy:** Websites → Advanced → Git, connect this repo, build command
   `npm install && npm run build`, publish directory `dist`.
3. **Manual:** `npm run build`, then upload the contents of `dist/` to `public_html`.

Then point the `bitfliptech.ai` domain at the site and enable Hostinger's free SSL.
The `.htaccess` in `public/` ships with the build so deep links work on Apache.

No Hostinger AI Builder / Horizons layer is required — this codebase already is the
custom layer, and Hostinger's AI visual tools (image generation, upscaling, heatmaps)
can still be used for production assets.
