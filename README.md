# bitfliptech.ai

The next chapter of [bitfliptech.com](https://bitfliptech.com) — an AI-native web agency site built on 17 years of client work.

## Stack

- **Vite + React + TypeScript**
- **React Three Fiber / Three.js** — custom GLSL shader particle field in the hero (cosmos-style fluid motion, mouse-reactive)
- **Lenis** — smooth scrolling
- Zero CSS frameworks — hand-rolled design system in plain CSS

## Structure

- `src/data/content.ts` — all site copy: services, process, the 2009→now client timeline, contact. Edit content here.
- `src/components/ParticleField.tsx` — the WebGL hero animation (tune `COUNT`, colors, and flow speed here)
- `src/components/Timeline.tsx` — scroll-revealed history from icatchbiz (2009) to bitfliptech.ai

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build && npm run preview
```
