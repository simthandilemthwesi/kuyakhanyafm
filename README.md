<p align="center">
  <img src="https://raw.githubusercontent.com/simthandilemthwesi/kuyakhanyafm/main/frontend/kuyakhanya-frontend/public/images/og-image.png" alt="KUYAKHANYA FM" width="100%" />
</p>

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

## License

MIT — © 2025 Simthandile Mthwesi / Kuyakhanya FM
