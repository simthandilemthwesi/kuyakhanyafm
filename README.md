# KUYAKHANYA FM — Website & Digital Platform

> Community-focused Christian radio station website — Next.js 16 static export on Firebase Hosting (Spark free tier).

**Live:** https://kuyakhanyafm.web.app
**Admin:** https://admin-kuyakhanyafm.web.app
**Version:** 2.1.0
**Developer:** Mr Simthandile Mthwesi
**Portfolio:** https://simthandilemthwesi.vercel.app

---

## What Is This?

The official website for **KUYAKHANYA FM** — a Christian community radio station in Thembalethu, George, South Africa. It serves as the station's digital home: live streaming, show schedules, presenter profiles, news, events, contact forms, a custom ad system, and a download page for the Android app.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Language | TypeScript 5 |
| Hosting | Firebase Hosting (Spark free plan) |
| Build | Static export (`output: "export"`) |
| Contact Forms | Supabase (client-side insert, RLS) |
| Weather | OpenWeatherMap API (client-side) |
| Chatbot | Chatbase (Simbot) |
| Streaming | Third-party embed (AsuraHosting — client-provided) |
| Android App | WebAPK (GitHub Releases) |
| Analytics | Vercel Analytics + Speed Insights |

## Project Structure

```
KUYAKHANYA FM WEB DEV/
├── frontend/
│   └── kuyakhanya-frontend/
│       ├── app/                    # 17+ routes (App Router)
│       │   ├── layout.tsx          # Root layout: metadata, OG, fonts, ads, SW
│       │   ├── page.tsx            # Home: Hero → Weather → About → Shows → Presenters → Team → ListenLive → News → Events
│       │   ├── globals.css         # Tailwind v4 + brand tokens (purple/gold)
│       │   ├── about/              # About page
│       │   ├── contact/            # Contact form (Web3Forms + hCaptcha + Supabase)
│       │   ├── download/           # APK download page (GitHub Releases)
│       │   ├── events/             # Events page
│       │   ├── media-centre/       # Media centre (advertising, partnerships)
│       │   ├── news/               # News articles
│       │   ├── presenters/         # Presenters index
│       │   ├── presenters/[slug]/  # Individual presenter profiles
│       │   ├── team/               # Team page
│       │   ├── team/[slug]/        # Individual team member profiles
│       │   ├── privacy/            # Privacy Policy
│       │   ├── terms/              # Terms of Use
│       │   ├── shows-presenters/   # Shows & Presenters combined
│       │   └── thank-you/          # Form submission success
│       ├── components/
│       │   ├── Header.tsx          # Sticky gradient header + mobile drawer
│       │   ├── Footer.tsx          # Gradient footer with socials + links
│       │   ├── Hero.tsx            # Full-bleed hero with animated waveform
│       │   ├── MasterCard.tsx      # Profile card (283.5×420.75, glassmorphism)
│       │   ├── ProfileModal.tsx    # Quick-view profile modal
│       │   ├── ProfileModalProvider.tsx  # Global modal context
│       │   ├── ShareBar.tsx        # Social share (FB, X, LinkedIn, WhatsApp, TikTok, copy)
│       │   ├── ShowsSection.tsx    # Home shows (Ithemba Lokulila, Ezakwa Ntu, Yizani Sakhe)
│       │   ├── PresentersSection.tsx  # Home presenters (4 cards)
│       │   ├── TeamSection.tsx     # Home team (4 managers)
│       │   ├── EventsSection.tsx   # Home events (Launch, AmaVundle, UNGMA)
│       │   ├── NewsSection.tsx     # Home news
│       │   ├── NewsCard.tsx        # News article card with modal
│       │   ├── ListenLive.tsx      # Audio player + stream embed + share
│       │   ├── WeatherWidget.tsx   # Live weather (OpenWeatherMap)
│       │   ├── CookieBanner.tsx    # Cookie consent (bottom-left, 1s)
│       │   ├── PopupAd.tsx         # Mobile popup ads (phones/tablets, 92vw/88dvh)
│       │   ├── VignetteAd.tsx      # Desktop full-screen vignette ads
│       │   ├── SidebarAd.tsx       # Desktop left rail ads
│       │   ├── BannerAd.tsx        # In-page banner ads
│       │   ├── InlineAd.tsx        # Article inline ads
│       │   ├── AppDownloadPopup.tsx  # App download prompt
│       │   ├── ContactForm.tsx     # Web3Forms + hCaptcha + Supabase
│       │   ├── JsonLd.tsx          # Organization structured data
│       │   └── ServiceWorkerRegister.tsx  # PWA service worker
│       ├── lib/
│       │   ├── shows.ts            # Show data (8 shows, times, images)
│       │   ├── people.ts           # Presenters + managers (slugs, bios)
│       │   ├── site-data.ts        # Static fallback data
│       │   ├── seo.ts              # Page metadata, OG defaults
│       │   ├── share.ts            # Social share URLs
│       │   ├── utils.ts            # cn() helper
│       │   └── app-download.ts     # Platform detection
│       ├── public/
│       │   ├── sw.js               # Service worker (network-first, cache-first)
│       │   ├── images/             # All images (team, shows, events, ads, logo)
│       │   └── downloads/          # Firebase config, database exports
│       └── next.config.ts          # Static export, image patterns
├── firebase.json                   # Hosting config (2 sites, redirects, headers)
├── .firebaserc                     # Firebase project config
├── webapk/                         # Android WebAPK wrapper
├── supabase/                       # SQL schema for contact forms
├── backend/                        # Legacy (DatoCMS models removed)
├── DEPLOYING.md                    # Deployment guide
├── KUYAKHANYA_FM_CHATBOT_KNOWLEDGE.md  # Simbot training data
└── README.md                       # This file
```

## Pages (17+ routes)

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Weather, About, Shows, Presenters, Team, Vision/Mission, Aims, Listen Live, News, Events |
| `/about` | About Us — logo, history, impact metrics, values |
| `/team` | Team — MD + 4 managers (MasterCard grid) |
| `/team/[slug]` | Team member profile + share + JSON-LD |
| `/presenters` | Presenters index (8 presenters) |
| `/presenters/[slug]` | Presenter profile + share + JSON-LD |
| `/shows-presenters` | Shows & Presenters combined |
| `/news` | News articles grid |
| `/events` | Events (Launch, AmaVundle, UNGMA Awards) |
| `/media-centre` | Media centre — advertise, partner |
| `/contact` | Contact form (Web3Forms + hCaptcha) |
| `/download` | Android app download (GitHub Releases) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/thank-you` | Form submission success |
| `/admin` | Admin dashboard (passcode-gated) |
| `/coming-soon` | Coming soon page |

## Key Features

- **Profile Cards** — MasterCard system (283.5×420.75 aspect, glassmorphism, gold border, share icons FB→X→LinkedIn→WhatsApp→TikTok→Copy Link)
- **Profile Modals** — Click any card for quick-view modal (Esc/backdrop close)
- **Custom Ad System** — 5 ad formats: Popup (mobile), Vignette (desktop), Sidebar (desktop rail), Banner (in-page), Inline (article). Orange #FD591A CTA buttons. Timed delivery: cookie 1s → popup 3s → vignette 4s → app popup 5s. Route-change + tab-visible triggers on desktop.
- **Cookie Consent Banner** — GDPR-compliant, bottom-left, Accept All / Reject Non-Essential / Customize (toggles default OFF). Persisted in localStorage.
- **Live Weather** — OpenWeatherMap API (George + 7 SA cities)
- **Live Stream** — Third-party embedded player (client-provided AsuraHosting code) + share/pop-out/WhatsApp buttons
- **News Cards** — Article modals (top-aligned on mobile)
- **Service Worker** — Network-first navigations, cache-first images/fonts (PWA offline support)
- **SEO** — JSON-LD structured data, OG images (1200×630), sitemap, robots.txt, llms.txt
- **PWA** — Web manifest, service worker, installable
- **Social Sharing** — navigator.share() + fallback (FB, X, LinkedIn, WhatsApp, TikTok, copy link)
- **Admin Dashboard** — Passcode-gated, live contact messages from Supabase, stream status check
- **Android App** — WebAPK wrapper served via GitHub Releases, download page with store icons

## Quick Start

```bash
cd frontend/kuyakhanya-frontend

npm install

# Dev
npm run dev
# → http://localhost:3000

# Build (static export)
npm run build
# → out/ directory

# Deploy (from repo root)
firebase deploy --only hosting
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Live weather (client-side) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (`https://kuyakhanyafm.web.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Contact form persistence |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Contact form persistence (RLS) |
| `NEXT_PUBLIC_ADMIN_CODE` | Admin panel passcode (default: `shine2026`) |

## Deployment

```powershell
# Build
cd frontend/kuyakhanya-frontend
npm run build

# Deploy both hosting sites
cd ../..
firebase deploy --only hosting
```

Both `kuyakhanyafm.web.app` and `admin-kuyakhanyafm.web.app` share the same static build. See `DEPLOYING.md` for full details.

## Show Schedule

| Day | Show | Time | Presenter |
|-----|------|------|-----------|
| Monday | Youth Spotlight | 19:00–20:00 | SBU Hamza |
| Tuesday | Love & Life | 18:00–19:00 | Franky |
| Wednesday | Abafazi Bokholo | 17:00–18:00 | Mrs Lolwana |
| Wednesday | Inkwenkwezi Zethu | 18:00–19:00 | Mrs Klaas |
| Thursday | Ithemba Lokulila | 18:00–20:00 | Mrs Mati & Mrs Panduva |
| Friday | Friday Vibes | 18:00–19:00 | Kay Cee |
| Saturday | Ezakwa Ntu | 13:00–15:00 | DJ Toto |
| Sunday | Yizani Sakhe | 18:00–20:00 | Mrs Mthwesi & Mrs Ndziba |

---

## Commercial Pricing (Client Quote)

> Pricing for web/app development business — charge everything: labor, integrations, free tier setups, and the custom ad system.

### 1. Development Labor

| Feature Area | Hours | Rate (ZAR) | Cost (ZAR) |
|-------------|-------|------------|------------|
| **Core Layout** — Header, Footer, Root Layout, Fonts, Metadata | 10 | R500 | R5,000 |
| **Home Page** — Hero, Weather, About, Shows, Presenters, Team, Vision/Mission, Aims, ListenLive, News, Events | 22 | R500 | R11,000 |
| **Profile System** — MasterCard (283.5×420.75 glassmorphism), ProfileModal, ProfileModalProvider, ShareBar (6 platforms) | 20 | R500 | R10,000 |
| **Custom Ad System** — PopupAd (mobile), VignetteAd (desktop), SidebarAd, BannerAd, InlineAd, CookieBanner, timing/z-index orchestration, route-change triggers | 24 | R500 | R12,000 |
| **Live Stream Embed** — Third-party player integration, audio controls, share/pop-out/WhatsApp buttons, responsive layout | 10 | R500 | R5,000 |
| **Contact Form** — Web3Forms integration, hCaptcha, Supabase mirror, subject templates, thank-you page | 10 | R500 | R5,000 |
| **Weather Widget** — OpenWeatherMap API, 8-city client-side fetch, responsive display | 6 | R500 | R3,000 |
| **News System** — NewsSection, NewsCard with article modal (mobile top-aligned), sorted grid | 8 | R500 | R4,000 |
| **Events Page** — 3 events with date badges, responsive cards | 5 | R500 | R2,500 |
| **Shows & Presenters** — ShowCard, show schedule data, 8 presenter profiles, 4 team profiles | 10 | R500 | R5,000 |
| **Dynamic Routes** — `/presenters/[slug]`, `/team/[slug]`, `/presenters` index, `generateStaticParams`, JSON-LD | 10 | R500 | R5,000 |
| **SEO Package** — JSON-LD structured data, OG images (1200×630), sitemap, robots.txt, llms.txt, page metadata | 8 | R500 | R4,000 |
| **PWA & Offline** — Service worker (network-first/cache-first), manifest, ServiceWorkerRegister | 5 | R500 | R2,500 |
| **Admin Dashboard** — Passcode-gated `/admin`, Supabase live messages, stream check | 6 | R500 | R3,000 |
| **Download Page** — APK GitHub Releases link, store icons, "Coming Soon" state | 4 | R500 | R2,000 |
| **Firebase Deployment** — Static export, multi-site hosting, redirects, headers, cache config | 6 | R500 | R3,000 |
| **Android WebAPK** — webapk wrapper, GitHub Release setup, download page integration | 5 | R500 | R2,500 |
| **Privacy & Terms Pages** — Legal pages with station-specific content | 4 | R500 | R2,000 |
| **Responsive Design** — Mobile-first across all 17+ routes, tablet breakpoints, desktop optimization | 12 | R500 | R6,000 |
| **Cross-Browser Testing** — Chrome, Safari, Edge, Firefox, mobile browsers | 6 | R500 | R3,000 |
| **Project Management** — Client communication, revisions, spec alignment | 10 | R500 | R5,000 |
| | | | |
| **LABOR SUBTOTAL** | **201 hrs** | | **R100,500** |

### 2. Service Setup & Integration Fees

Even free tiers require expertise to configure, wire, and debug. Charge for the knowledge:

| Service | What Was Done | Setup Fee (ZAR) |
|---------|---------------|-----------------|
| **Firebase Hosting** | Project creation, 2 hosting sites, `firebase.json` config, redirects, headers, clean URLs, SSL, cache policies | R2,500 |
| **Supabase** | Project setup, Postgres schema, RLS policies, client-side anon key wiring, contact form persistence | R2,000 |
| **OpenWeatherMap** | API key generation, 8-city config, client-side fetch with error handling, responsive widget | R1,000 |
| **Web3Forms** | Access key setup, hCaptcha integration, subject/phone templates, Supabase mirror | R1,500 |
| **hCaptcha** | Site key/secret config, form integration, GDPR compliance | R800 |
| **Chatbase (Simbot)** | Knowledge base creation (259 lines), chatbot training, widget embed, branding config | R2,500 |
| **GitHub Releases** | APK upload, release tagging (`android-v1.0`), download page linking, asset management | R1,000 |
| **Vercel Analytics** | Speed Insights + Web Analytics integration in root layout | R500 |
| **Stream Embed** | Third-party AsuraHosting player code integration, fallback handling, responsive player UI | R1,500 |
| | | |
| **SETUP SUBTOTAL** | | **R13,300** |

### 3. Custom Ad System (Premium Feature)

Your own ad network — a major value-add. Charge separately for building, configuring, and owning this system:

| Ad Format | Description | Build Fee (ZAR) |
|-----------|-------------|-----------------|
| **PopupAd** | Mobile-only (phones/tablets <1000px), 92vw/88dvh overlay, 5-min interval, orange #FD591A CTA button | R3,000 |
| **VignetteAd** | Desktop-only (≥1000px), 5-min interval, route-change + tab-visible triggers | R3,000 |
| **SidebarAd** | Desktop left rail ad slot, `hidden lg:block`, sticky positioning | R2,000 |
| **BannerAd** | In-page banner placement, responsive, linked to media-centre#advertise | R2,000 |
| **InlineAd** | Article-level inline ad, between content blocks | R1,500 |
| **CookieBanner** | GDPR-compliant consent, Accept All / Reject / Customize, localStorage persistence, timed before ads | R2,500 |
| **Ad Timing Engine** | Orchestrated delivery: cookie 1s → popup 3s → vignette 4s → app popup 5s, z-index layering (cookie z-[80], ads z-[40]) | R2,000 |
| **Ad Client Network** | Framework for serving your own ads (custom images, links, CTA buttons) — ready for advertiser partnerships | R3,000 |
| | | |
| **AD SYSTEM SUBTOTAL** | | **R19,500** |

### 4. Third-Party Service Fees (Pass-Through)

> **Note:** AsuraHosting streaming is provided by a third party. Client only provides the embed code — no hosting cost to us.

| Service | Actual Cost/mo | + 10% Margin | Billed to Client/mo | Annual (ZAR) |
|---------|---------------|--------------|---------------------|--------------|
| **AsuraHosting** | R0 (third-party provided) | — | **R0** | **R0** |
| **.co.za Domain** (recommended) | R7.40 (R89/yr) | R0.74 | **R8.14** | **R98** |
| **Firebase Hosting** | R0 | — | R0 | R0 |
| **Supabase** | R0 | — | R0 | R0 |
| **OpenWeatherMap** | R0 | — | R0 | R0 |
| **Web3Forms** | R0 | — | R0 | R0 |
| **hCaptcha** | R0 | — | R0 | R0 |
| **Chatbase** | R0 | — | R0 | R0 |
| **GitHub** | R0 | — | R0 | R0 |
| **Vercel Analytics** | R0 | — | R0 | R0 |
| | | | | |
| **RECURRING SUBTOTAL** | | | **~R8/mo** | **~R98/yr** |

### 5. Project Total

| Category | Cost (ZAR) |
|----------|------------|
| Development Labor (201 hrs × R500) | R100,500 |
| Service Setup & Integration (9 services) | R13,300 |
| Custom Ad System (8 components) | R19,500 |
| **PROJECT TOTAL (once-off)** | **R133,300** |
| | |
| Recurring (monthly) | ~R8/mo |
| Recurring (annual) | ~R98/yr |

### 6. Client Package Options

| Package | What's Included | Price (ZAR) |
|---------|----------------|-------------|
| **Basic** | 5-page brochure site (Home, About, Contact, Shows, Team), basic stream embed, no ads, no chatbot, no PWA | **R35,000** |
| **Standard** | 12 pages, profile cards, live stream embed, contact form, weather, SEO, Firebase hosting, basic ad (1 format) | **R85,000** |
| **Premium** (current build) | Full 17+ pages, 30+ components, full ad system (5 formats + cookie consent + timing engine), chatbot, PWA, admin, WebAPK, all integrations | **R133,300** |
| **Enterprise** | Premium + custom CMS dashboard, e-commerce, multi-language, advanced analytics, ongoing ad network management | **R200,000+** |

### 7. Ongoing Maintenance Retainer (Optional)

| Tier | What's Included | Monthly (ZAR) |
|------|----------------|---------------|
| **Basic** | Hosting management, SSL renewals, security patches, monthly backup check | R500/mo |
| **Standard** | Basic + content updates (up to 10 changes/mo), bug fixes, monthly report | R1,500/mo |
| **Premium** | Standard + new features (up to 20 hrs/mo), priority support, quarterly analytics review, ad network management | R3,500/mo |

### 8. Payment Terms (Suggested)

| Milestone | % of Total | Amount (ZAR) |
|-----------|-----------|--------------|
| Signing / Deposit | 40% | R53,320 |
| Design approval | 30% | R39,990 |
| Final delivery & launch | 30% | R39,990 |
| **Total** | **100%** | **R133,300** |

---

## License

MIT — © 2025 Simthandile Mthwesi / Kuyakhanya FM
