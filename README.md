# 🚀 SOHAM NAYAK — PORTFOLIO 2026 // CREATIVE DEV SPEC

A production-grade, ultra-high-end creative developer portfolio built with an **Editorial Brutalist & Modern Cyberpunk** design system (Red `#E60023`, Deep Black `#0A0A0C`, and Crisp White `#FFFFFF`).

---

## ✨ Features & Architecture Highlights

### 1. 🌊 Momentum Scroll & Motion Design
- **Lenis Smooth Scroll**: Integrated `@studio-freight/lenis` momentum scrolling for 60fps inertia across desktop and mobile.
- **Custom Physics Cursor**: Dual-element physics cursor (`dot` + `follower ring`) using spring lerp interpolation (`lerp(current, target, 0.15)`), `mix-blend-mode`, glowing red state transitions, and contextual badge text (`EXPLORE`, `VIEW`) on interactive hover targets.
- **Dual-Axis Parallax Engine**: Mouse-controlled and scroll-linked depth parallax applied independently to the central 3D character render (`hero-character.png`) and giant background typography (`"MULTIMEDIA"` cycling text).

### 2. ⚡ Fully Functional Sections & Components
- **"Explore Works" & Dynamic Project Gallery**: Filterable grid categorized by **3D Modeling & Dev**, **AI Prompting & Design**, **Full-Stack Software**, and **Motion & Video Editing**.
- **Immersive Project Modal**: Clicking any project card opens a full-featured modal overlay complete with technical architecture summaries, key highlights, tech stack pills, and interactive preview tabs (`OVERVIEW`, `FEATURES`, `TECH SPECS`).
- **Interactive Navigation & Drawer Overlay**: Fullscreen minimalist overlay drawer with staggered link entrance animations (`01 HERO`, `02 ABOUT`, `03 WORKS`, `04 ARSENAL`, `05 CONTACT`) and social media links.
- **Live Status Indicator & Digital Clock**: Interactive "ULTRA HUMAN" status badge displaying a live ticking digital clock (IST / Local time), current availability status, response time guarantee, and primary focus.
- **Working Interactive Contact Form**: Client inquiry form featuring real-time input validation, transmission loading state, and an interactive **Transmission Receipt Modal** (`#SPEC-2026-XXXX`).

### 3. 🔊 Web Audio API Sound Controller
- Pure JavaScript sound synthesizer (`SoundController`) generating tactile UI audio effects without external MP3 dependencies:
  - Tactile button clicks & toggle sound.
  - Soft sine frequency hover tone.
  - Multi-tone success chord sweep on form transmission.
  - Header audio toggle button (`SFX ON` / `SFX OFF`) with `localStorage` preference persistence.

### 4. 📐 Modular Architecture & Performance
- Zero layout shift (CLS: 0), fast initial load times, and lightweight vanilla JavaScript architecture.
- 3D card tilt effects (`data-tilt`) using CSS perspective matrix transforms.
- Fully responsive across ultra-wide desktop monitors, tablets, and mobile smartphones.

---

## 💻 How to Run Locally

Because this is a standard static web application with native ES/DOM modules and local asset references, you can run it using any local web server:

### Option 1: Python HTTP Server
```bash
python -m http.server 8080
```
Then open your browser to `http://localhost:8080`.

### Option 2: Node.js `serve` / `npx`
```bash
npx serve -l 8080
```
Then open `http://localhost:8080`.

---

## 🌐 How to Deploy to Production

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root directory.
3. Select default settings to publish instantly.

### Netlify Deployment
1. Drag and drop the workspace folder into the Netlify Web Console dashboard, or
2. Run `npx netlify-cli deploy --prod`.

### GitHub Pages
1. Push this repository to GitHub.
2. In **Repository Settings** -> **Pages**, set the build and deployment source to **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` deploys the site on each push to `main`.

---

## 🛠 Tech Stack
- **Structure**: Semantic HTML5
- **Styling**: CSS3 (CSS Custom Properties, Flexbox, Grid, Glassmorphism, Brutalist Typography)
- **Scripting**: Vanilla JavaScript (ES6+), Web Audio API
- **Libraries**: Lenis Momentum Scroll (Bundled local fallback & CDN support), FontAwesome 6
