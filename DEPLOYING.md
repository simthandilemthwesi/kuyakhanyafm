# DEPLOYING — KUYAKHANYA FM (Next.js → Firebase Hosting, Spark plan)

This guide covers deploying the KUYAKHANYA FM website to **Firebase Hosting** on the **Spark (free) plan**. The frontend is a Next.js 16 App Router app in `frontend/kuyakhanya-frontend`, statically exported to `out/` and served entirely from Firebase's CDN.

> Canonical domain: **https://kuyakhanyafm.web.app** (all SEO, sitemap, robots, llms.txt and metadata point here).

---

## ⚠️ Spark plan — what actually works

Firebase **Spark** (free) can ONLY run static Firebase Hosting. These are **NOT available** on Spark (they need Blaze):

- ❌ Cloud Functions
- ❌ Cloud Run
- ❌ App Hosting

The site therefore works fully **without any server**:

| Feature | How it works on Spark |
|---------|----------------------|
| Live weather (Home + News) | Fetched **client-side** straight from OpenWeatherMap using `NEXT_PUBLIC_OPENWEATHER_API_KEY`. No server proxy. |
| Contact form | Inserted **client-side** directly into Supabase (`NEXT_PUBLIC_SUPABASE_URL` + anon key). Supabase handles the backend. |
| `llms.txt` / `llms-full.txt` | Static files in `public/`. |
| Simbot chatbot | Third-party client widget (Chatbase). |
| Admin panel | Served as a static page under `/admin` on the main site. |

The old `/api/*` Next.js routes were removed — they cannot run on static hosting.

## 1) Prerequisites

- Node.js 20+ and npm.
- A Firebase project with Hosting enabled: `kuyakhanyafm` (already created).
- Firebase CLI: run once:
  ```powershell
  npm i -g firebase-tools
  firebase login
  ```
- The `.env.local` below (already present, gitignored).

## 2) Environment variables

The values live in `frontend/kuyakhanya-frontend/.env.local` (not committed — set them in CI or manually before deploy).

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | `1c2f27d04bef0373186c51c2f7a1b79d` | Client-side live weather (George + 7 SA cities). |
| `NEXT_PUBLIC_SITE_URL` | `https://kuyakhanyafm.web.app` | Canonical site URL used for share links. |
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL | Contact form persistence. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key | Contact form persistence (client-side insert with RLS). |

## 3) Build (static export)

The repo config already sets `output: "export"` and `images: { unoptimized: true }` in `next.config.ts`. From the frontend folder:

```powershell
cd frontend/kuyakhanya-frontend
npm.cmd run build
```

This produces a fully static site in `frontend/kuyakhanya-frontend/out/`. No server is started, and no `next start` is used.

## 4) Deploy to Firebase Hosting

`firebase.json` is configured for two Hosting sites sharing the same static export:

- **Main site** → `kuyakhanyafm.web.app` (target `kuyakhanyafm`)
- **Admin site** → `admin-kuyakhanyafm.web.app` (target `admin-kuyakhanyafm`)

From the **repo root**:

```powershell
# build first
cd frontend/kuyakhanya-frontend
npm.cmd run build
cd ..\..   # back to repo root

# deploy main site
firebase deploy --only hosting:kuyakhanyafm

# deploy admin site
firebase deploy --only hosting:admin-kuyakhanyafm

# or deploy both
firebase deploy
```

`firebase deploy` reads `.firebaserc` (default project `kuyakhanyafm`) and deploys every Hosting site configured in `firebase.json`.

## 5) Multi-site hosting notes

- Both sites point at the **same `out/` build**. The admin panel is a route inside the app (`/admin`), so both domains can reach it.
- If you later want a **separate admin build**, change `hosting-admin.public` in `firebase.json` to a different output dir and build accordingly.
- `cleanUrls: true` + fallback rewrite (`**` → `/index.html`) keep SPA-style navigation working. Static files are served first, so real routes like `/about` still show the exported HTML.

## 6) Post-deploy checks

Verify on the live URLs:

- `https://kuyakhanyafm.web.app/` — player, weather, shows, presenters, contact.
- `https://kuyakhanyafm.web.app/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest`.
- Weather shows live data on Home + News (client-side OpenWeather fetch).
- Contact form saves to Supabase `contact_submissions`.
- Simbot bubble loads bottom-right.

## 7) Full deployment checklist

- [ ] `firebase-tools` installed (`npm i -g firebase-tools`) and logged in
- [ ] `frontend/kuyakhanya-frontend/.env.local` has the 5 env vars from section 2
- [ ] `npm.cmd run build` succeeds (static export, no `next start`)
- [ ] `firebase deploy` uploads `out/` to `kuyakhanyafm.web.app`
- [ ] `firebase deploy --only hosting:admin-kuyakhanyafm` uploads to `admin-kuyakhanyafm.web.app`
- [ ] Weather shows live data on Home + News
- [ ] Contact form persists to Supabase
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` return 200

> When you upload real team/presenter photos later, drop them into `frontend/kuyakhanya-frontend/public/images/` and update the paths in `lib/site-data.ts` — then rebuild and redeploy.