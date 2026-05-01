# Sipe's Portfolio

> A 3D interactive developer portfolio built with SvelteKit 5, Three.js and Threlte.

![Vercel](https://img.shields.io/badge/deployed-vercel-black?logo=vercel)
![SvelteKit](https://img.shields.io/badge/SvelteKit-5-ff3e00?logo=svelte)
![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=threedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

![[Portfolio Screenhot](./screenshot.png)](https://sipe-portfolio.vercel.app/)

---

## Overview

Instead of a traditional scrolling portfolio, this site places the visitor inside a 3D scene — a metallic cube floats in an empty dark void. Each face of the cube is a page. Navigate to a face, press Enter or click to dock in, and the page content fades up as if the cube face itself became a screen.

## Features

- **3D cube navigation** — six faces mapped to six routes, with smooth quaternion slerp rotation
- **Camera zoom** — camera tweens toward the active face on enter, pulls back on exit
- **Void background** — custom GLSL shader background with animated light streaks
- **Page transitions** — cross fly-in animation on face enter
- **Responsive** — adaptive FOV for mobile and desktop viewports
- **Keyboard shortcuts** — press `1–6` to navigate faces, `Enter` to enter, `Escape` to exit
- **Contact form** — SvelteKit form action with server-side validation

## Pages

| Face | Route | Content |
|------|-------|---------|
| Hero | `/` | Introduction, stack, CTA |
| Projects | `/projects` | Fullstack, frontend and Web3 work |
| About | `/about` | Bio, timeline, values |
| Contact | `/contact` | Form + social links |
| Lab | `/lab` | Experiments, tools, generative art |
| Secret | `/secret` | ??? |

## Tech Stack

**Frontend**
- [SvelteKit 5](https://kit.svelte.dev) — framework, routing, form actions
- [Threlte v8](https://threlte.xyz) — Svelte bindings for Three.js
- [Three.js](https://threejs.org) — 3D rendering, shaders, marching cubes

**Backend**
- SvelteKit server actions — contact form handling
- [Vercel](https://vercel.com) — deployment

## Getting Started

```bash
# clone the repo
git clone https://github.com/yourusername/3d-portfolio.git
cd 3d-portfolio

# install dependencies
pnpm install

# start dev server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```text
src/
├── lib/
│   ├── components/
│   │   ├── cube/          # Cube mesh, faces, float animation
│   │   ├── scene/         # Canvas, camera, lights, background,
│   │   ├── html/          # Page layouts and overlay system
│   │   └── nav/           # Navigation component
│   ├── states/            # Svelte 5 rune-based cube state
│   └── utils/             # Face config, positions, rotations
└── routes/                # Face pages
├── +layout.svelte     # Root layout — mounts scene + overlay
├── +page.svelte       # Hero face page
├── about/
├── projects/
├── contact/
├── lab/
└── secret/
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `1` | Hero |
| `2` | Projects |
| `3` | About |
| `4` | Contact |
| `5` | Lab |
| `6` | Secret |
| `Enter` | Enter active face |
| `Escape` | Exit back to scene |

## License

MIT — feel free to take inspiration, but please don't copy it wholesale.

---

Built by [Emmanuel Adesipe](https://github.com/LukoOG)
