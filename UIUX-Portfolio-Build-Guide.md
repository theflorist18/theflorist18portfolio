# Building a UI/UX Design Portfolio (GitHub Pages)

A complete, opinionated guide for building a second portfolio focused on **UI/UX design** — distinct from your existing technical/security site at `theflorist18.github.io/el_portafolio/`.

> **The core idea:** For a developer or security portfolio, the *content* (reports, writeups, code) is the proof. For a **UI/UX portfolio, the site itself is the proof.** Every transition, every bit of spacing, every animation is a sample of your work. A recruiter or client judges your design skill in the first 5 seconds — before they read a word. Build accordingly.

---

## 0. Before you write any code: strategy

A UI/UX portfolio is judged on three things, in this order:

1. **Craft of the portfolio itself** — does *this site* feel designed, intentional, and polished?
2. **Quality of thinking** — do your case studies show *process* (problem → research → decisions → outcome), not just pretty screens?
3. **Clarity & usability** — can someone find your best work and contact you in seconds?

Two honest notes for someone moving into UI/UX:

- **If you don't have much UX work yet**, that's normal and fixable. Acceptable portfolio pieces include: a redesign concept of an existing app (e.g. "I redesigned my university's course portal"), a personal product idea taken through the full design process, a design-system you built, or **this portfolio site itself** documented as a case study. 2–3 deep case studies beat 8 shallow ones.
- **Keep your security site.** Don't delete `el_portafolio`. Cross-link them ("I also do security research →"). Range is a strength; just keep the two identities visually separate so this site reads unmistakably as *design*.

---

## 1. Pick a bold aesthetic direction (do this first)

The biggest mistake is "generic clean modern" — it signals *no point of view*. Commit to ONE direction and execute it precisely. Pick from (or remix) these:

| Direction | Feels like | Good if you want to signal |
| --- | --- | --- |
| **Editorial / magazine** | Big serif headlines, asymmetric grids, lots of whitespace | Taste, typography skill, maturity |
| **Brutalist / raw** | Monospace, hard borders, exposed structure, high contrast | Confidence, "I break rules on purpose" |
| **Soft / organic** | Warm off-whites, rounded forms, gentle motion, pastel accents | Approachability, product-design warmth |
| **Retro-futuristic / Y2K** | Chrome, gradients, glassy 3D, bold color | Energy, trend-awareness, fun |
| **Luxury / refined minimal** | Restraint, micro-typography, slow deliberate motion | Premium feel, precision |
| **Maximalist** | Dense, layered, decorative, surprising | Personality, art-direction range |

**Rules that apply to every direction (non-negotiable for a *design* portfolio):**

- **Typography is everything.** Avoid the AI-default fonts: Inter, Roboto, Arial, system fonts, and the overused "Space Grotesk." Pair a **distinctive display font** with a **clean body font**. Free, characterful options: *Fraunces, Instrument Serif, Bricolage Grotesque, Clash Display, General Sans, Satoshi, Cabinet Grotesk* (Fontshare), *Newsreader, Spectral, Sora* (Google Fonts). Pick 2 — one display, one text. That single choice defines 50% of the vibe.
- **Color: dominant + sharp accent.** Don't spread 6 colors evenly. Choose one dominant background tone, one near-black/near-white for text, and **one** confident accent. Avoid the cliché purple-gradient-on-white look. Use CSS custom properties so it's consistent and changeable.
- **Atmosphere, not flat fills.** Add subtle depth: a grain/noise overlay, a soft gradient mesh, fine grid lines, or layered shadows. Flat solid backgrounds read as unfinished.
- **Motion with intent.** One beautifully orchestrated page-load reveal beats twenty random hover wiggles (more in §5).

Write your chosen direction at the top of your notes in one sentence, e.g.:
> *"Editorial-minimal: Fraunces display + General Sans body, warm paper background (#F4F1EA), ink text (#1A1A1A), single coral accent (#FF5A36), slow deliberate motion, asymmetric two-column grid."*

Everything you build should trace back to that sentence.

---

## 2. Choose your tech stack

Because you're hosting on **GitHub Pages** (static files only — no backend/server code), both options below work. Pick based on how much motion power you want.

### Option A — Recommended: Vite + React + Tailwind + Motion
Best for *seamless transitions + rich animation*. Has a build step, so you'll deploy via GitHub Actions (§4).

```
Vite (build tool)
React (UI)
Tailwind CSS (styling, fast iteration)
Motion (framer-motion) — page transitions, layout animations, gesture animations
Lenis — buttery smooth scrolling
GSAP + ScrollTrigger (optional) — advanced scroll-driven sequences
@splinetool/react-spline OR react-three-fiber (optional) — 3D models
```

### Option B — Lightweight: plain HTML + CSS + vanilla JS
No build step. Deploy straight from a branch. Great if you prefer full control and minimal tooling.

```
HTML / CSS / JS
GSAP + ScrollTrigger — animation engine
Lenis — smooth scroll
Spline web component — 3D (drop-in, no framework)
```

**Recommendation:** If you're comfortable with React, go **Option A** — it makes the "seamless transition" feel (animated route changes, shared-element transitions) dramatically easier. If you want zero tooling and faster setup, **Option B** is completely viable and still award-worthy.

> Single-page vs multi-page: A **single long scrolling page** with section anchors is the simplest and animates beautifully. Add **separate case-study pages** as you grow (this is where animated page transitions shine — §5.4).

---

## 3. Project setup

### Option A (Vite + React)

```bash
# create the project
npm create vite@latest design-portfolio -- --template react
cd design-portfolio
npm install

# styling + motion + scroll
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install motion lenis

# optional power-ups
npm install gsap
npm install @splinetool/react-spline @splinetool/runtime   # 3D, optional

npm run dev   # local preview at http://localhost:5173
```

**Critical for GitHub Pages:** project sites live at `username.github.io/REPO/`, so assets must resolve under that subpath. In `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/design-portfolio/',   // <-- MUST match your repo name exactly (with slashes)
})
```

> If you later host it at the **root** of `theflorist18.github.io` (see §4), change `base` back to `'/'`.

### Option B (plain HTML)
Just create the folder and files — no install needed. Use **relative paths** for all assets (`./assets/...`, not `/assets/...`) so they work under the `/REPO/` subpath automatically.

Suggested structure for either option is in §9.

---

## 4. Deploy to GitHub Pages

You have two URL choices:

- **Project site (simplest):** new repo `design-portfolio` → lives at `https://theflorist18.github.io/design-portfolio/`
- **Root site (cleanest URL):** repo named exactly `theflorist18.github.io` → lives at `https://theflorist18.github.io/`. You could make the *design* portfolio your root site and keep `el_portafolio` as a linked subpath. Your call.

### 4A. Deploying Option A (build step → GitHub Actions)

1. Push your project to a new GitHub repo.
2. In the repo, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
4. Push to `main`. The workflow builds and publishes automatically. Future pushes redeploy.

### 4B. Deploying Option B (plain HTML, no build)

1. Put `index.html` at the repo root.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `root`.**
3. Done. It's live in ~1 minute.

### Custom domain (optional)
If you buy a domain (e.g. `netsakh.design`), add it under **Settings → Pages → Custom domain**, create a `CNAME` file in your repo with the domain, and set DNS records at your registrar. GitHub provisions HTTPS automatically.

### SPA routing gotcha
If you use client-side routing (React Router) with separate paths, GitHub Pages will 404 on direct links/refresh. Fixes: use **hash routing**, or add a `404.html` that redirects to `index.html`. For a portfolio, the simplest robust approach is one page + anchor links, adding real sub-pages only when needed.

---

## 5. The motion & transitions playbook ⭐

This is the section that makes a *design* portfolio feel alive. Use these deliberately — quality over quantity.

### 5.1 Page-load reveal (the first impression)
Stagger the entrance of hero elements. One orchestrated reveal creates more delight than scattered micro-animations.

**CSS-only (works anywhere):**
```css
@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal { opacity: 0; animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.reveal:nth-child(1) { animation-delay: 0.05s; }
.reveal:nth-child(2) { animation-delay: 0.15s; }
.reveal:nth-child(3) { animation-delay: 0.25s; }
/* the cubic-bezier above is "easeOutExpo" — smooth, premium deceleration */
```

**Motion / React:**
```jsx
import { motion } from "motion/react"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

<motion.div variants={container} initial="hidden" animate="show">
  <motion.h1 variants={item}>Netsakh Walewangko</motion.h1>
  <motion.p  variants={item}>Product & UI/UX Designer</motion.p>
  <motion.a  variants={item} href="#work">See selected work</motion.a>
</motion.div>
```

### 5.2 Scroll-triggered reveals
Animate sections as they enter the viewport.

**Vanilla (Intersection Observer — lightweight, no library):**
```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view') })
}, { threshold: 0.15 })

document.querySelectorAll('[data-animate]').forEach((el) => io.observe(el))
```
```css
[data-animate]{ opacity:0; transform:translateY(32px); transition:opacity .7s ease, transform .7s cubic-bezier(0.22,1,0.36,1); }
[data-animate].in-view{ opacity:1; transform:none; }
```

**Pro version (GSAP ScrollTrigger)** — for pinned sections, parallax, scrubbed timelines tied to scroll position:
```js
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

gsap.from(".project-card", {
  y: 80, opacity: 0, duration: 1, stagger: 0.15,
  scrollTrigger: { trigger: ".work", start: "top 75%" },
})
```

### 5.3 Smooth scrolling (Lenis)
The single biggest "expensive feel" upgrade. Replaces the OS's choppy scroll with a smooth, inertial one.
```js
import Lenis from "lenis"
const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) })
function raf(time){ lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)
```
> If using both Lenis and GSAP ScrollTrigger, sync them: call `lenis.on('scroll', ScrollTrigger.update)` and drive Lenis from GSAP's ticker.

### 5.4 Seamless page transitions (the "no hard reload" feel)
This is what you mean by *seamless transition* between pages.

**Modern, zero-JS — View Transitions API** (great for multi-page static sites on GitHub Pages; degrades gracefully where unsupported):
```css
/* enables animated cross-page transitions for same-origin navigations */
@view-transition { navigation: auto; }

/* tag a shared element on both pages with the same name to morph it across the navigation */
.project-hero-image { view-transition-name: hero-img; }
```

**React (Motion)** — animate route changes with `AnimatePresence`:
```jsx
import { AnimatePresence, motion } from "motion/react"
// Wrap your routed page; animate exit + enter as the route changes.
<AnimatePresence mode="wait">
  <motion.main key={pathname}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}>
    {page}
  </motion.main>
</AnimatePresence>
```
**Vanilla alternative:** the [barba.js] library handles fade/slide transitions between plain HTML pages by intercepting navigation.

### 5.5 Micro-interactions that feel custom
A few high-impact ones (don't overdo it):

- **Magnetic button** — button gently follows the cursor on hover:
```js
const btn = document.querySelector('.magnetic')
btn.addEventListener('mousemove', (e) => {
  const r = btn.getBoundingClientRect()
  const x = e.clientX - r.left - r.width / 2
  const y = e.clientY - r.top - r.height / 2
  btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
})
btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)' })
```
- **Custom cursor** — a small follower dot that grows over links (a portfolio signature, used sparingly).
- **Link underline draw-in**, **image reveal on scroll** (clip-path wipe), **number count-up** for stats, **hover scale on project thumbnails** with `cubic-bezier` easing.

### 5.6 Easing & timing cheat-sheet
Good easing separates pro from amateur. Defaults to keep:
- **Entrances/reveals:** `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo), 0.6–0.9s
- **UI feedback (hover, taps):** `ease-out`, 0.15–0.25s — fast, snappy
- **Page transitions:** 0.3–0.5s, symmetric `ease-in-out`
- Animate **`transform` and `opacity` only** (GPU-accelerated). Never animate `width`, `height`, `top`, `left`, or `margin` — they cause expensive layout reflows and jank.

---

## 6. 3D models & immersive elements

You mentioned "models" — interactive 3D is a hallmark of high-end design portfolios. Two routes:

### Spline (easiest — design in a visual editor, drop in)
Design/animate a scene at spline.design, export, and embed. No 3D code required.

**Plain HTML (web component):**
```html
<script type="module"
  src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/XXXXXXXX/scene.splinecode"></spline-viewer>
```

**React:**
```jsx
import Spline from '@splinetool/react-spline'
<Spline scene="https://prod.spline.design/XXXXXXXX/scene.splinecode" />
```

### Three.js / react-three-fiber (full control)
More powerful (custom shaders, physics, scroll-linked 3D) but heavier and a steeper learning curve. In React, `@react-three/fiber` + `@react-three/drei` is the standard. Reserve this for a genuine 3D centerpiece.

**Performance rules for 3D (important):**
- **Lazy-load** the 3D scene; never block first paint with it. Show a static poster image first, then hydrate the canvas.
- Keep model file sizes small; compress textures.
- **Disable or replace 3D for reduced-motion users and low-power devices** (§7).
- Watch your Largest Contentful Paint — a heavy hero kills perceived speed, which ironically reads as *bad UX*.

---

## 7. Accessibility & performance (this IS UX)

A flashy site that's slow or unusable contradicts the skill you're claiming. Non-negotiables:

**Respect reduced motion** — wrap all non-essential animation:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In JS, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip Lenis/heavy effects accordingly.

**Other essentials:**
- Real, descriptive `alt` text on every image; semantic HTML (`<header> <main> <section> <nav> <footer>`); logical heading order (one `<h1>`).
- Visible keyboard focus states; all interactive elements reachable by Tab.
- Color contrast ≥ 4.5:1 for body text (ironic to fail this in a *design* portfolio).
- **Optimize images:** export at the right size, use modern formats (WebP/AVIF), add `loading="lazy"` to below-the-fold images. Heavy hero media is the #1 cause of slow portfolios.
- Test on **mobile** — most recruiters open links on their phone first. Responsive is mandatory, not optional.
- Add `<title>`, `<meta name="description">`, and Open Graph tags (`og:title`, `og:image`) so the link looks good when shared on LinkedIn/Slack.
- Target a green Lighthouse score (run it in Chrome DevTools → Lighthouse).

---

## 8. Content: information architecture & case studies

### Page / section structure
A solid default (single page, with case studies as the centerpiece):

1. **Hero** — your name, the role ("Product / UI/UX Designer"), a one-line value proposition, and one tasteful motion moment. No clutter.
2. **Selected Work** — 3–5 projects max. Each thumbnail links to a case study. This is the most important section; put it high.
3. **Case study pages** — the depth (structure below).
4. **About** — short story, what you care about, your design process in a sentence, a photo, tools you use. Make it human.
5. **Skills / Tools** — Figma, prototyping, user research, design systems, etc. (Keep it brief — show, don't list.)
6. **Contact** — email, LinkedIn, and a clear CTA. Reuse the contact details from your existing site.
7. *Optional:* a **Playground** of experiments/explorations, and a **résumé/CV** download.

### Case study structure (the part that actually gets you hired)
Recruiters read *how you think*. For each project, tell a story:

1. **Overview** — one line: what it is, your role, timeframe, tools.
2. **Problem** — what was broken or needed? Who for?
3. **Research / discovery** — interviews, competitor analysis, what you learned.
4. **Process** — sketches, wireframes, iterations, decisions *and the reasoning behind them*. Show the messy middle, not just the polished end.
5. **Solution** — the final designs, prototypes (embed a Figma prototype or short screen-recording).
6. **Impact / outcome** — results, feedback, metrics, or what you'd measure. Even "improved task completion in user testing" counts.
7. **Reflection** — what you learned, what you'd do differently. Shows maturity.

> Embed Figma prototypes directly with their `<iframe>` embed code, and use short looping screen-recordings (muted, autoplay, `playsinline`) to show interactions.

---

## 9. Suggested file structure

**Option A (Vite + React):**
```
design-portfolio/
├─ .github/workflows/deploy.yml
├─ public/
│  ├─ favicon.svg
│  └─ og-image.png
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css            # Tailwind + CSS variables + base styles
│  ├─ lib/
│  │  └─ lenis.js          # smooth-scroll init
│  ├─ components/
│  │  ├─ Hero.jsx
│  │  ├─ Work.jsx
│  │  ├─ ProjectCard.jsx
│  │  ├─ About.jsx
│  │  ├─ Contact.jsx
│  │  └─ Cursor.jsx        # custom cursor (optional)
│  └─ pages/
│     └─ CaseStudy.jsx
├─ vite.config.js          # base: '/design-portfolio/'
├─ tailwind.config.js
└─ package.json
```

**Option B (plain HTML):**
```
design-portfolio/
├─ index.html
├─ work/
│  └─ project-one.html     # case study pages
├─ assets/
│  ├─ css/style.css
│  ├─ js/main.js           # Lenis + GSAP + interactions
│  ├─ fonts/
│  └─ img/
├─ og-image.png
└─ favicon.svg
```

---

## 10. Tools & libraries — quick reference

| Need | Tool | Notes |
| --- | --- | --- |
| Build tool | **Vite** | Fast, modern; needs the Actions workflow on Pages |
| Styling | **Tailwind CSS** | Fast iteration; or plain CSS with custom properties |
| Animation (React) | **Motion** (framer-motion) | Page transitions, gestures, layout animation |
| Animation (any) | **GSAP + ScrollTrigger** | Industry standard for scroll-driven sequences |
| Smooth scroll | **Lenis** | Biggest "premium feel" upgrade, tiny |
| 3D (easy) | **Spline** | Visual editor, drop-in embed |
| 3D (advanced) | **Three.js / react-three-fiber** | Full control, heavier |
| Page transitions (vanilla) | **View Transitions API** / **barba.js** | Native CSS first; barba as fallback |
| Fonts | **Fontshare**, **Google Fonts** | Free, characterful display + body pairing |
| Icons | **Lucide**, **Phosphor** | Clean, consistent |
| Quality check | **Lighthouse** (Chrome DevTools) | Aim for green across the board |

---

## 11. Where to find inspiration (study, don't copy)

Browse these to build taste and reverse-engineer techniques — note *how* transitions and motion are used, then make your own version:

- **Awwwards** (`awwwards.com`) — award-winning sites; filter by "Portfolio." Gold standard for motion/transitions.
- **Godly** (`godly.website`) — curated, design-forward inspiration.
- **Land-book** (`land-book.com`) and **SiteInspire** (`siteinspire.com`) — clean galleries.
- **Httpster** (`httpster.net`) — bold, characterful sites.
- **Minimal Gallery** (`minimal.gallery`) — for refined/minimal directions.
- **Dribbble** & **Behance** — for UI screens and case-study layout ideas.
- **Read.cv / posts** and designer personal sites — study how strong designers structure *case studies*, not just visuals.

> Copy *techniques and principles* (how they pace a reveal, how they structure a case study), never code or designs verbatim. Your portfolio must read as authored by you.

---

## 12. Pre-launch checklist

- [ ] One clear aesthetic direction, executed consistently
- [ ] Distinctive font pairing (no Inter/Roboto/Arial)
- [ ] One dominant color + one accent, via CSS variables
- [ ] Orchestrated page-load reveal (staggered)
- [ ] Smooth scroll (Lenis) enabled
- [ ] Scroll-triggered section reveals
- [ ] Seamless page transitions (View Transitions / Motion / barba)
- [ ] 1–2 tasteful micro-interactions (not a circus)
- [ ] 3D element lazy-loaded + has a static fallback (if used)
- [ ] `prefers-reduced-motion` respected everywhere
- [ ] Fully responsive; tested on a real phone
- [ ] Images optimized (WebP/AVIF, lazy-loaded), Lighthouse green
- [ ] 3–5 case studies with full problem → process → outcome stories
- [ ] Figma prototypes / screen-recordings embedded
- [ ] Contact details + LinkedIn + résumé link
- [ ] `<title>`, meta description, Open Graph image set
- [ ] Cross-link to your security portfolio (`el_portafolio`)
- [ ] Deploys cleanly to GitHub Pages with correct `base` path

---

### Suggested build order
1. Pick the aesthetic direction + font/color pair (§1).
2. Scaffold the project and get an empty page deploying to GitHub Pages (§3–4) — confirm the pipeline works *before* building content.
3. Build the hero + page-load reveal + smooth scroll (§5.1, §5.3).
4. Build the Work section and one full case study (§8).
5. Layer in scroll reveals, page transitions, and (optionally) a 3D element (§5.2, §5.4, §6).
6. Polish: accessibility, performance, responsive, meta tags (§7).
7. Add remaining case studies and launch (§12).

Good luck — make the site itself the strongest thing in your portfolio.
