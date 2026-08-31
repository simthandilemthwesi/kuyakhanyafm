# KUYAKHANYA FM — Version 2

> Full-stack CMS-driven radio platform — upgrade from static Firebase site (v1) to dynamic DatoCMS + Next.js + Tailwind.

**Live (v1 legacy):** https://kuyakhanyafm.web.app
**v2 target:** Vercel (frontend) + Render (Strapi fallback) + Supabase Postgres (DB) + Cloudinary (media) + DatoCMS (CMS)

> Free-tier only: DatoCMS free plan, Supabase Postgres, Cloudinary free tier, Vercel Hobby, Firebase free. No trial services used.

## Project Structure

```
KUYAKHANYA FM WEB DEV/
├── backend/
│   └── kuyakhanya-backend/
│       └── DatoCMS (models, GraphQL, migration, env)
│       └── Supabase (Postgres schema, contact forms, optional analytics)
│       └── Cloudinary (media upload config)
├── frontend/
│   └── kuyakhanya-frontend/
│       └── Next.js 16 (App Router, Turbopack)
│       └── Tailwind CSS v4
│       └── TypeScript 5
│       └── 10 reusable components (Hero, Introduction, AboutUs, VisionMission, AimsObjectives, TeamPreview, ListenLive, Footer, Header, ContactSection)
│       └── lib/ (api.ts, datocms.ts, queries.ts, site-data.ts)
│       └── app/ (Home, /team, /contact, layout.tsx, globals.css)
│       └── public/ (team photos, logo, hero image)
│       └── README.md (frontend docs)
├── vercel.json    → Vercel config (headers, rewrites)
├── firebase.json  → Firebase rewrite for kuyakhanyafm.web.app
└── README.md      → this file
```

## What's New in v2 (vs v1 static)

| v1 (Firebase static) | v2 (CMS-driven) |
|----------------------|-----------------|
| Hard-coded HTML/CSS in `index.html` (~1219 lines) | Next.js App Router with 10 reusable Tailwind components |
| Google Form iframe only | DatoCMS GraphQL + REST + fallback form |
| Images in flat `/images` | DatoCMS CDN + `next/image` optimization |
| No CMS | DatoCMS: 10 models, GraphQL, draftAndPublish, RBAC (5 roles) |
| Firebase hosting only | Vercel (frontend) + Firebase domain mapping + SSL |
| Static data | Real-time CMS data with ISR fallback |

## Local Development — Full Stack

### 1) Backend — DatoCMS bootstrap

```bash
cd backend/kuyakhanya-backend
# set env
copy .env.example .env
# edit .env — set DATOCMS_API_TOKEN (full-access, env: main)
# optional: SUPABASE_*, CLOUDINARY_* if you use the optional schemas

npm install   # installs @datocms/cma-client-node
node datocms/migrate.mjs   # creates 10 models in DatoCMS project 229086
# then in DatoCMS UI → Content → create records for each model
# set DATOCMS_READONLY_API_TOKEN in frontend .env.local
```

### 2) Frontend — Next.js dev

```bash
cd frontend/kuyakhanya-frontend
npm install

# .env.local (optional — works offline with site-data fallback)
echo NEXT_PUBLIC_DATOCMS_READONLY_API_TOKEN=YOUR_TOKEN > .env.local

npm run dev
# open http://localhost:3000
# Home pulls from DatoCMS (vision-mission, aims, etc.) with fallback to site-data.ts
```

Pages:
- `/` — Home: Hero + Introduction + About + Vision & Mission + Aims + Team Preview + Listen Live + Contact
- `/team` — Our Team: MD + Management + Technician + Presenters grid
- `/contact` — Contact: banner + phone/email/WhatsApp/socials + Google Form iframe
- `/about`, `/services`, `/programmes`, `/news` — DatoCMS-driven pages

### 3) Deployment

#### Frontend — Vercel (Free Hobby tier)

**A) Dashboard (recommended)**
1. Push repo to GitHub.
2. https://vercel.com → **Add New Project** → Import GitHub repo
3. Root Directory: `frontend/kuyakhanya-frontend`
4. Framework: Next.js, Build: `npm run build`, Output: `.next`
5. Env: `NEXT_PUBLIC_DATOCMS_READONLY_API_TOKEN=<your token>`
6. Deploy → gets `https://kuyakhanya-xyz.vercel.app`

**B) CLI**
```bash
npm i -g vercel
cd frontend/kuyakhanya-frontend
vercel --prod
# or: powershell -ExecutionPolicy Bypass -Command "vercel --prod"
vercel env add NEXT_PUBLIC_DATOCMS_READONLY_API_TOKEN
# then redeploy
vercel --prod
```

**Custom domain mapping:**
- Vercel Dashboard → Settings → Domains → Add `kuyakhanyafm.co.za` (or your domain)
- Add CNAME in your registrar → `cname.vercel-dns.com`

**Firebase domain mapping** `kuyakhanyafm.web.app`:
See `firebase.json` — rewrites send all routes to Vercel. Or:
1. Keep `kuyakhanyafm.web.app` on Firebase Hosting (static, no SSR needed).
2. Or use a custom domain you own and add to both Vercel + Firebase.
3. SSL auto-provisioned by both Vercel & Firebase.

#### Backend — Render / Railway (free tier) + Supabase + Cloudinary

**Render (free 750 hrs/month):**
1. render.com → New Web Service → connect GitHub → Root: `backend/kuyakhanya-backend`
2. Build: `npm install && npm run build`, Start: `npm run start`
3. Env: `DATABASE_CLIENT=postgres`, `DATABASE_URL=<Supabase pooling URI>`, `CLOUDINARY_*`, `FRONTEND_URL=https://your-vercel-url`
4. Deploy → `https://kuyakhanya-backend.onrender.com`

**Supabase:** free tier (500 MB DB, 2 GB bandwidth). Enable PgBouncer pooling URI.

**Cloudinary:** no deploy, just env vars.

After backend is live, set `NEXT_PUBLIC_DATOCMS_READONLY_API_TOKEN` in Vercel and redeploy.

#### Deployment Checklist
- [ ] Backend env set (DATABASE_URL, CLOUDINARY_*, DATOCMS_*)
- [ ] Frontend env has `NEXT_PUBLIC_DATOCMS_READONLY_API_TOKEN`
- [ ] CORS in DatoCMS (or fallback to public read) allows Vercel URL
- [ ] Admin created at DatoCMS UI
- [ ] Records created for all 10 models in DatoCMS
- [ ] Images load via DatoCMS CDN / Cloudinary mirror
- [ ] `kuyakhanyafm.web.app` serves new site (or via custom domain) with SSL lock
- [ ] Vercel Analytics optional (free hobby)
- [ ] firebase.json tested — `firebase deploy --only hosting`

## Free-Tier Limits & Tips

| Service | Free quota | Tip |
|---------|------------|-----|
| **DatoCMS** | 10 models, 1000 records, GraphQL | Free plan permanent — no trial. We use 10 models exactly. |
| **Supabase Postgres** | 500 MB DB, 2 GB bandwidth, 50k MAU | Use PgBouncer pooling URI; prune `contact_submissions` periodically. |
| **Cloudinary** | 25 GB storage + 25 GB bandwidth/month | Set `sizeLimit:10MB`, use `f_auto,q_auto` in Next.js `next/image`. |
| **Vercel** | 100 GB bandwidth, 6000 exec hrs | Hobby is free forever; no trial. |
| **Firebase Hosting** | 10 GB storage, 360 MB/day transfer | Keep as fallback; or export Next.js to static `out/` and deploy there. |

## License

MIT — © 2025 Simthandile Mthwesi / Kuyakhanya FM

--- 

**v2.0.0 complete** — backend (DatoCMS 10 models, GraphQL, free-tier config, 5 roles, seed, docs) + frontend (10 components, 3 pages, Tailwind brand, DatoCMS unified API client, docs) + Vercel + Firebase deployment. Run `npm install` in both workspaces, set envs, and deploy.