# Kuyakhanya FM — Frontend v2 (Next.js 16 + Tailwind v4 + Vercel)

> **Version:** 2.0.0  |  **Stack:** Next.js 16.3.1 (App Router, Turbopack) • React 19 • Tailwind CSS v4 • TypeScript 5

## Quick Start

```bash
cd frontend/kuyakhanya-frontend

npm install
# or: powershell -ExecutionPolicy Bypass -Command "npm install"

# Dev
npm run dev
# → http://localhost:3000

# Build / Start
npm run build
npm run start

# Lint
npm run lint
```

Env (optional — works offline with fallback data):

```env
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=  # optional public API token
```

## Project Structure

```
frontend/kuyakhanya-frontend/
├── app/
│   ├── layout.tsx          # Root layout: metadata, Header+Footer, Geist fonts
│   ├── page.tsx            # Home: Hero + Introduction + About + VisionMission + Aims + TeamPreview + ListenLive + Contact
│   ├── globals.css         # Tailwind v4 + design tokens (purple/gold/white)
│   ├── team/page.tsx       # Our Team: MD → Management → Technician → Presenters grid
│   ├── contact/page.tsx    # Contact standalone (reuses ContactSection)
│   └── not-found.tsx       # 404
├── components/
│   ├── Header.tsx          # Sticky gradient header + mobile drawer (client)
│   ├── Footer.tsx          # Gradient footer with socials
│   ├── Hero.tsx            # Full-bleed image + gradient + CTAs + stats strip
│   ├── Introduction.tsx    # White card + tags
│   ├── AboutUs.tsx         # Two-col with image & feature grid
│   ├── VisionMission.tsx   # Split: gradient Vision + light Mission list
│   ├── AimsObjectives.tsx  # Numbered list card
│   ├── TeamPreview.tsx     # MD + Management/Tech + presenters mini-grid + CTA
│   ├── ListenLive.tsx      # Asura stream player (cast3.asurahosting.com) + fallbacks
│   └── ContactSection.tsx  # Left info cards + right Google Form iframe
├── lib/
│   ├── api.ts              # Strapi REST + GraphQL client, types, mediaUrl helper
│   └── site-data.ts        # Static fallback data (mirrors Strapi seed) — used when API offline
├── public/
│   ├── images/             # Copied from root /images (team photos, logos, hero)
│   └── simlogo.svg         # Designer credit
├── next.config.ts          # Images: Cloudinary, Supabase, localhost
└── tsconfig.json
```

## Pages & Routes

| Route | Description | Data |
|-------|-------------|------|
| `/` | **Home** — all sections in one scroll: Hero → Introduction → About → Vision & Mission → Aims → Team Preview → Listen Live → Contact | `fetchVisionMission`, `fetchAimsObjectives` (ISR 60s), rest via `site-data.ts` |
| `/team` | **Our Team** — Hero banner + Managing Director (featured) + Management Team (2-col) + Technician + Presenters (5-col grid, 15 cards) | `site-data.presenters` + optional `fetchPresenters` |
| `/contact` | **Contact** — banner + ContactSection (phone/WhatsApp/email/socials + Google Form iframe) | `site-data.contact` / `fetchContactInfo` |
| `/#introduction`, `/#about`, `/#vision-mission`, `/#aims`, `/#listen-live`, `/#contact` | Anchor sections on Home (Header nav scrolls) | — |
| `/*` | 404 — branded not-found | — |

### Section mapping to spec

Spec required: Home (Hero, Introduction, About Us, Vision & Mission, Aims & Objectives, Our Team preview, Listen Live, Contact Us) ✅
Spec required: Our Team (Hero, Managing Director, Management Team, Technician, Presenters) ✅
Spec required: Contact (form + social links) ✅ (both on Home and `/contact`)

## Reusable Components (8 required + extras)

| Component | File | Props | Responsive |
|-----------|------|-------|------------|
| **Hero** | `Hero.tsx` | — | min-h 540→700, text 4xl→52px, CTAs stack on mobile |
| **Introduction** | `Introduction.tsx` | — | card, tags wrap |
| **AboutUs** | `AboutUs.tsx` | — | 2-col lg:grid, image with badge |
| **VisionMission** | `VisionMission.tsx` | `vision?`, `missionItems?` | 2-col grid, gradient + light cards |
| **AimsObjectives** | `AimsObjectives.tsx` | `objectives?` | centered numbered list |
| **TeamPreview** | `TeamPreview.tsx` | — | MD full-width → 2-col, presenters 2→5 cols |
| **ListenLive** | `ListenLive.tsx` | — | client, Asura `cc_player` + Open Stream fallback |
| **Footer** | `Footer.tsx` | — | 3-col → 1-col |
| **Header** | `Header.tsx` | — | lg nav + mobile drawer (≤1024px) |
| **ContactSection** | `ContactSection.tsx` | — | 2-col lg:grid, iframe 560px |

All components use **Tailwind v4** utilities, brand tokens via `globals.css` (`--purple`, `--gold`, etc.), and are **mobile-first** (breakpoints `sm:640`, `lg:1024`, `xl:1280`).

## API Connection — lib/api.ts

```ts
import {
  fetchProgrammes, fetchPresenters, fetchManagementTeam,
  fetchTechnicians, fetchVisionMission, fetchAimsObjectives, fetchContactInfo,
  gql, STRAPI_URL
} from "@/lib/api";

// REST (ISR 60s)
const vision = await fetchVisionMission(); // → /api/vision-mission
const aims   = await fetchAimsObjectives(); // → /api/aims-objectives
const team   = await fetchManagementTeam(); // → /api/management-teams?populate=*

// GraphQL
const data = await gql<{ programmes: Programme[] }>(`query { programmes { documentId title } }`);
```

- `STRAPI_URL` defaults to `http://localhost:1337` (overridable via `NEXT_PUBLIC_STRAPI_URL`).
- Optional `NEXT_PUBLIC_STRAPI_TOKEN` added as `Authorization: Bearer`.
- Helpers: `mediaUrl()`, `strapiImage()` normalize Strapi media URLs (relative → absolute).
- Fetchers gracefully **fallback to `[]`/`null`** so UI renders with `site-data.ts` when Strapi is down.

### Supabase note

Frontend never talks to Supabase directly — it talks to Strapi, which uses Supabase Postgres. No Supabase client needed client-side.

## Tailwind Theme — Brand Colors

`app/globals.css`:

```css
:root {
  --purple: #6a0dad;
  --purple-light: #8a2be2;
  --purple-dark: #4b0082;
  --gold: #ffd700;
  --gold-light: #ffec8b;
  /* ... */
}
@theme inline {
  --color-purple: var(--purple);
  --color-gold: var(--gold);
}
```

Usage: `bg-[#6a0dad]`, `text-[#ffd700]`, `border-[#6a0dad]`, `from-[#6a0dad] to-[#4b0082]`. All components use these tokens for consistency.

## Responsive Design

- **Mobile (≤640):** single column, stacked CTAs, drawer nav, 2-col presenter grid
- **Tablet (640–1024):** 2–3 cols, larger hero (5xl), 3-col stats
- **Desktop (≥1024):** full nav, 2-col About, 5-col presenters, max-w 1280 container
- Tested breakpoints: `sm`, `lg`, `xl` + custom `xs` for logo.

## Scripts

| Script | What |
|--------|------|
| `npm run dev` | Next dev (Turbopack if available) |
| `npm run build` | Production build (`.next`) |
| `npm run start` | Start prod server |
| `npm run lint` | ESLint (next/core-web-vitals + TS) |

## Deployment (Vercel)

See root `README.md` → Deployment. TL;DR:

```bash
npm i -g vercel
vercel --prod
# set env: NEXT_PUBLIC_STRAPI_URL=https://your-strapi.onrender.com
```

`next.config.ts` already allows images from Strapi/Cloudinary/Supabase.

---

© 2025 Kuyakhanya FM — MIT
