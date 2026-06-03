# Netsakh Walewangko — UI/UX Design Portfolio

A luxury-refined design portfolio. Deep near-black canvas, warm bone text, a single
champagne-gold accent, tracked micro-typography, and slow deliberate motion. Built so the
site itself is the strongest sample of the work.

**Live:** https://theflorist18.github.io/theflorist18portfolio/

> Design direction: *Luxury-refined minimal — Fraunces display serif + General Sans body,
> near-black canvas (#0A0A0B), warm bone text (#EDEAE3), single champagne-gold accent
> (#C8A96A), tracked micro-caps, slow deliberate motion, generous negative space.*

---

## Stack

| Concern | Tool |
| --- | --- |
| Build | [Vite](https://vitejs.dev) |
| UI | React 18 + React Router (BrowserRouter) |
| Motion | [Motion](https://motion.dev) (framer-motion) — reveals, page transitions, magnetic + cursor |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Styling | Tailwind CSS + a custom CSS design-token layer (`src/index.css`) |
| Icons | lucide-react |
| Fonts | Fraunces (Google Fonts) + General Sans (Fontshare) |
| Deploy | GitHub Actions → GitHub Pages |

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/theflorist18portfolio/
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

> The dev server serves under the `/theflorist18portfolio/` base path (matching production),
> so open the full URL above, not bare `localhost:5173`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages. **One-time setup:** on GitHub → **Settings → Pages → Build and deployment →
Source: GitHub Actions.**

Deep links and refresh on sub-pages (e.g. `/work/aperture`) work via the standard SPA
redirect trick: `public/404.html` bounces unknown paths to `index.html`, which restores the
URL before React Router takes over.

### Moving to the root site / a custom domain
- **Root site** (`theflorist18.github.io`): set `base: '/'` in `vite.config.js`, update the
  absolute OG/canonical URLs in `index.html`, and `pathSegmentsToKeep = 0` in `public/404.html`.
- **Custom domain**: add it under Settings → Pages, add a `CNAME` file, set DNS at your registrar.

## Editing content

All copy lives in **`src/content/portfolio.js`** — one file:

- `profile` — your name, role, email, location, and social links.
  **Replace the `linkedin` URL** and tweak `location`. (Search for `TODO`.)
- `hero`, `about`, `skills`, `contact`, `seo`, `marquee` — the connective copy.
- `studies` — the case studies. **Aperture, Cadence, and Meridian are realistic demo
  pieces** that show the case-study structure (problem → research → process → solution →
  impact → reflection). Replace them with your real work as it lands. 2–3 deep case
  studies beat many shallow ones.

### Adding real images
The case-study cover and the About portrait are tasteful gradient/monogram placeholders.
To use real media:
- **Portrait:** in `src/components/About.jsx`, swap the placeholder block for
  `<img src="/your-portrait.jpg" alt="Netsakh Walewangko" className="w-full rounded-2xl" />`
  (drop the file in `public/`).
- **Case-study covers/screens:** add a hero image / embedded Figma prototype / muted
  autoplay screen-recording in `src/pages/CaseStudy.jsx`.

### The 3D car ("In motion" section)
A real-time 3D **Porsche 911 (930 Turbo)** drives across and turns as you scroll, rendered
with `react-three-fiber` (studio lighting is built from `Lightformer` cards — no HDR file).

- Model: `public/models/porsche-911.glb`. It's **compressed** (textures → WebP @2048,
  geometry quantized — no runtime decoder needed): 21.9 MB → **4.7 MB**.
- Loaded lazily in its own JS chunk (`src/components/Car3DScene.jsx`) only when the section
  nears the viewport, with a static gold line-art fallback (`CarPoster.jsx`) for
  reduced-motion / no-WebGL / low-power devices. First paint is never blocked.
- **To swap the model:** drop a new `.glb`, compress it, and overwrite the file:
  ```bash
  npx @gltf-transform/cli optimize new.glb public/models/porsche-911.glb \
    --compress quantize --texture-compress webp --texture-size 2048
  ```
  If the new model is oriented/scaled differently, tweak `TARGET_LEN` / `ROT_Y` at the top
  of `src/components/Car3DScene.jsx` (it auto-centers and ground-aligns otherwise).

### Social preview image
`public/og-image.svg` is the source for the link preview. Some platforms (LinkedIn, some
Slack/iMessage paths) render PNG more reliably than SVG — export `og-image.svg` to a
1200×630 **`public/og-image.png`** (the `index.html` meta already points at the `.png`).

## Project structure

```
├─ .github/workflows/deploy.yml   # GitHub Pages CI
├─ public/
│  ├─ 404.html                    # SPA deep-link redirect
│  ├─ favicon.svg
│  └─ og-image.svg                # social preview (export a .png alongside it)
├─ src/
│  ├─ main.jsx · App.jsx          # router + page transitions + Lenis + cursor
│  ├─ index.css                   # design tokens, atmosphere, type, reduced-motion
│  ├─ content/portfolio.js        # ALL copy + case studies
│  ├─ lib/                        # Lenis provider, motion variants
│  ├─ components/                 # Nav, Hero, Marquee, Work, ProjectCard, About, Contact, Footer, Cursor, Magnetic, Reveal, Sparkle, Page
│  └─ pages/                      # Home, CaseStudy, NotFound
├─ vite.config.js                 # base: '/theflorist18portfolio/'
└─ tailwind.config.js
```

## Accessibility & motion

- All motion respects `prefers-reduced-motion` (via `MotionConfig reducedMotion="user"`,
  a global CSS fallback, and guards in Lenis/cursor/marquee).
- Semantic landmarks, one `<h1>` per view, visible gold focus rings, keyboard-reachable nav.
- Dark theme with bone-on-near-black body text meeting WCAG AA contrast.

---

Designed & built by Netsakh Walewangko. Type set in Fraunces & General Sans.
