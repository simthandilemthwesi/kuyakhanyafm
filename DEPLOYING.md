# DEPLOYING — KUYAKHANYA FM (Next.js → Vercel)

This guide covers deploying the KUYAKHANYA FM website to **Vercel** (free Hobby tier). The frontend is a Next.js 16 App Router app in `frontend/kuyakhanya-frontend`. `vercel.json` sets the **framework** to `nextjs`. The **Root Directory** is configured in the Vercel dashboard (see step 3 below).

> Canonical domain: **https://kuyakhanyafm.web.app** (all SEO, sitemap, robots, llms.txt and metadata point here). DNS-serve this via Vercel (see [Custom domain](#-custom-domain-and-dns) below).

---

## 1) Prerequisites

- A GitHub repo containing this project. The repo is `simthandilemthwesi/kuyakhanyafm`, `main` branch.
- A Vercel account: https://vercel.com (log in with GitHub for the smoothest import).
- The environment variables below.

## 2) One-time environment variables

Create these in the Vercel project **Settings → Environment Variables** (Production/Preview/Development). The file `.env.local` is gitignored and does **not** deploy, so set them in Vercel.

| Variable | Value | Purpose |
|----------|-------|---------|
| `OPENWEATHER_API_KEY` | `1c2f27d04bef0373186c51c2f7a1b79d` | Live Weather feature (`/api/weather`). Without it, weather returns errors. |
| `NEXT_PUBLIC_SITE_URL` | `https://kuyakhanyafm.web.app` | Canonical site URL used for share links. |
| `NEXT_PUBLIC_STRAPI_URL` *(optional)* | your backend URL | Only if using the Strapi fallback for team data. |
| `DATOCMS_READONLY_API_TOKEN` *(optional)* | your token | Only if using DatoCMS as a CMS. The site runs fully offline with `lib/site-data.ts`, so this is optional. |

> **Note:** The DatoCMS `401` lines in the build log are harmless and do not block deployment. They come from a stale/unused token; you may ignore them or remove the unused env var.

## 3) Deploy via Vercel Dashboard (recommended)

1. Go to **https://vercel.com** → **Add New… → Project**.
2. Click **Import** next to the `kuyakhanyafm` GitHub repo.
3. Vercel reads `vercel.json` (framework: `nextjs`). Then **set the Root Directory** in the dashboard:
   - Go to **Project Settings → General → Root Directory**
   - Set it to `frontend/kuyakhanya-frontend`
4. Under **Environment Variables**, add the ones from [section 2](#2-one-time-environment-variables).
5. Click **Deploy**. Vercel builds and hosts the site (e.g. `https://kuyakhanya-xyz.vercel.app`).
6. Every future `git push` to `main` triggers an automatic redeploy.

## 4) Deploy via Vercel CLI

```powershell
# install the CLI once
npm i -g vercel

# log in once
vercel login

# from the frontend folder
cd frontend/kuyakhanya-frontend

# add env vars (prompts for value each time)
vercel env add OPENWEATHER_API_KEY
vercel env add NEXT_PUBLIC_SITE_URL

# production deploy (set root directory in dashboard first: Settings → Root Directory → frontend/kuyakhanya-frontend)
vercel --prod
```

## 5) Custom domain and DNS (canonical = web.app)

We keep **https://kuyakhanyafm.web.app** as the canonical domain. Two ways to make Vercel serve it:

**A) Point the web.app domain at Vercel (recommended — canonical stays web.app):**
1. Vercel dashboard → your project → **Settings → Domains** → **Add** → enter `kuyakhanyafm.web.app`.
2. Vercel will list the required DNS records (usually a CNAME to `cname.vercel-dns.com`) to add at your registrar/Firebase.
3. Add the DNS record. SSL is provisioned automatically.
4. Since `robots.ts`, `sitemap.ts`, `metadataBase` and all links already use `https://kuyakhanyafm.web.app`, no code change is needed.

**B) Use a domain you own (optional alternative):**
- Add e.g. `kuyakhanyafm.co.za` under **Settings → Domains**.
- Add a CNAME at your registrar: `cname.vercel-dns.com`.
- Update `NEXT_PUBLIC_SITE_URL` and the `SITE_URL`/`kuyakhanyafm.web.app` strings in `lib/seo.ts`, `lib/share.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` if you want that domain to be canonical.

> `firebase.json` and the Firebase-hosted `public/index.html` are kept only as a fallback resolver and now point to `kuyakhanyafm.web.app` (the 301 to `kuyakhanyafm.vercel.app` was removed). The real site is served by Vercel.

## 6) Post-deploy checks

After the first deploy + DNS, verify on the live URL:

- `/` — home loads, player and weather work (weather needs `OPENWEATHER_API_KEY`).
- `/news`, `/about`, `/services`, `/programmes`, `/team`, `/shows-presenters`, `/contact`.
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt`, `/opengraph-image` all return 200.
- Chatbase **Simbot** bubble loads bottom-right.
- `@vercel/analytics` + `@vercel/speed-insights` appear as active Vercel web insights.

## 7) Full deployment checklist

- [ ] Vercel project imported with Root Directory `frontend/kuyakhanya-frontend`
- [ ] `OPENWEATHER_API_KEY` set in Vercel env
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://kuyakhanyafm.web.app`
- [ ] First production deploy succeeds (build + TypeScript pass)
- [ ] Custom domain `kuyakhanyafm.web.app` added and DNS records applied
- [ ] SSL active and `https` redirects on
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` return 200 on the live domain
- [ ] Weather shows live data on Home + News
- [ ] Simbot chat bubble loads
- [ ] Push to `main` redeploys automatically

> When you upload real team/presenter photos later, drop them into `frontend/kuyakhanya-frontend/public/images/` and update the paths in `lib/site-data.ts` — no redeploy-framework change needed, just a normal git push.