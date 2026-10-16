# Kuyakhanya FM — Backend v2 (Strapi 5 + Supabase + Cloudinary)

> **Official website:** [https://kuyakhanyafm.web.app](https://kuyakhanyafm.web.app)
> **Version:** 2.0.0  |  **Stack:** Strapi 5.52.1 • PostgreSQL (Supabase free tier) • Cloudinary free tier • GraphQL

## Quick Start

```bash
cd backend/kuyakhanya-backend

# 1. Install deps (first time)
npm install
# if you see ExecutionPolicy error on Windows:
powershell -ExecutionPolicy Bypass -Command "npm install"

# 2. Configure env
copy .env.example .env
# edit .env — see Database & Cloudinary sections below

# 3. Develop (auto-reload, sqlite by default)
npm run develop
# → http://localhost:1337/admin

# 4. Production (Supabase postgres)
# set DATABASE_CLIENT=postgres and DATABASE_URL, then:
npm run build
npm run start
```

## Database — Supabase Free Tier (Postgres)

Strapi `config/database.ts` supports **both** sqlite (local) and postgres (Supabase) via `DATABASE_CLIENT`.

### Local (zero-config)
```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Production — Supabase

1. Create free project at https://supabase.com → New Project
2. Project → **Database** → **Connect** → **Connection string** → **URI**
3. Copy URI, e.g. `postgresql://postgres.[ref]:[pwd]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
4. Fill `.env`:
```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres
DATABASE_HOST=db.YOUR_REF.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=YOUR_SUPABASE_DB_PASSWORD
DATABASE_SSL=true
DATABASE_SCHEMA=public
```

> **Free tier limits:** 500 MB DB, 2 GB bandwidth/month — plenty for CMS. Strapi handles pooling (`DATABASE_POOL_MIN/MAX`).

## Media — Cloudinary Free Tier

1. Create account at https://cloudinary.com (free: 25 GB storage + 25 GB bandwidth/month)
2. Dashboard → copy **Cloud name / API Key / API Secret**
3. `.env`:
```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```
4. `config/plugins.ts` automatically switches `upload.provider` to `cloudinary` when `CLOUDINARY_NAME` is set; otherwise falls back to local `public/uploads`.

## Content Types (7)

| # | Name | Type | Kind | Key fields |
|---|------|------|------|------------|
| 1 | **Programme** | Collection | `api::programme.programme` | `title` (uid slug), `description`, `schedule`, `cover` (media), `isActive`, `presenters` (m2m → Presenter) |
| 2 | **Presenter** | Collection | `api::presenter.presenter` | `name`, `slug`, `bio`, `showName`, `photo`, `order`, `programmes` (m2m) |
| 3 | **Management Team** | Collection | `api::management-team.management-team` | `name`, `role`, `bio`, `photo`, `order`, `isActive` |
| 4 | **Technician** | Collection | `api::technician.technician` | `name`, `role`, `bio`, `photo`, `isActive` |
| 5 | **Vision & Mission** | Single | `api::vision-mission.vision-mission` | `vision` (text), `missionItems` (json array) |
| 6 | **Aims & Objectives** | Single | `api::aims-objectives.aims-objectives` | `title`, `objectives` (json array) |
| 7 | **Contact Info** | Single | `api::contact-info.contact-info` | `phone`, `whatsapp`, `email`, `address`, `facebook/instagram/youtube/tiktok/whatsappLink`, `googleFormUrl` |

### Creating first entries

Via Admin UI (`/admin` → Content Manager) or via REST (with admin JWT).

Seed data: `src/index.ts:bootstrap()` auto-creates single-types + management team on first run if empty. Disable by removing that block.

## API Endpoints

### REST (default, `draftAndPublish` enabled → add `?publicationState=live` for public)

Base: `http://localhost:1337/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/programmes` | List programmes (pagination, filters) |
| GET | `/api/programmes/:id` | Single programme |
| GET | `/api/programmes/:id?populate=presenters,cover` | With relations & media |
| POST | `/api/programmes` | Create (auth required) |
| PUT | `/api/programmes/:id` | Update |
| DELETE | `/api/programmes/:id` | Delete |
| GET | `/api/presenters` | List presenters |
| GET | `/api/presenters?populate=programmes,photo` | With relations |
| GET | `/api/management-teams` | Management team |
| GET | `/api/management-teams?sort=order:asc&populate=photo` | Ordered |
| GET | `/api/technicians` | Technicians |
| GET | `/api/vision-mission` | Vision & Mission (single) — no id |
| GET | `/api/aims-objectives` | Aims & Objectives (single) |
| GET | `/api/contact-info` | Contact Info (single) |
| POST | `/api/upload` | Upload media (multipart/form-data) — goes to Cloudinary if configured |

**Query examples:**

```bash
# Published only, populate, pagination
curl "http://localhost:1337/api/programmes?populate=*&pagination[pageSize]=10&publicationState=live"

# Filter
curl "http://localhost:1337/api/presenters?filters[showName][$eq]=Elobukumkani&populate=*"

# Single-type
curl "http://localhost:1337/api/vision-mission?populate=*"
curl "http://localhost:1337/api/contact-info"
```

### GraphQL

Plugin: `@strapi/plugin-graphql` — endpoint `POST /graphql`, playground disabled in production.

Enable via `config/plugins.ts:graphql.shadowCRUD=true` (auto-generates queries/mutations).

```graphql
# Example: fetch programmes with presenters
query {
  programmes(publicationState: LIVE, pagination: { pageSize: 10 }) {
    documentId
    title
    slug
    description
    schedule
    presenters { name showName }
    cover { url alternativeText }
  }
  visionMission { vision missionItems }
  contactInfo { phone email facebook instagram }
}

# Single presenter
query { presenter(documentId:"xxx"){ name bio photo{url} programmes{title} } }

# Mutation (auth required)
mutation {
  createProgramme(data:{ title:"New Show", description:"...", schedule:"Mon 08:00", isActive:true }){
    documentId title
  }
}
```

Headers for writes: `Authorization: Bearer <JWT or API Token>`.

## Roles & Permissions

`src/index.ts:bootstrap()` creates 4 custom admin roles (in addition to Strapi's **Super Admin**):

| Role | Description | Can manage |
|------|-------------|------------|
| **Super Admin** | Built-in, full access | Everything |
| **Station Manager** | Overall oversight | All 7 content types, publish, users |
| **Media Manager** | Media & programmes | Programme, Presenter, Management Team, Technician + Cloudinary uploads |
| **Editor** | Editorial | Vision-Mission, Aims-Objectives, Contact-Info, Programme, Presenter |
| **Presenter** | Limited | Own Presenter profile (update), view Programmes |

**Public role** (unauthenticated) is auto-configured to `find`/`findOne` on all 7 types — so frontend can fetch without token. Lock down in Admin → Settings → Users & Permissions → Roles → Public if needed.

**To create API Tokens:** Admin → Settings → API Tokens → Create new → choose read/write scopes per content type.

## CORS

Allowed origins in `config/middlewares.ts`:

- `http://localhost:3000` (Next.js dev)
- `http://localhost:1337`
- `https://kuyakhanyafm.web.app` + `firebaseapp.com`
- `process.env.FRONTEND_URL` (set in `.env`)

Add Vercel preview URLs there if needed.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run develop` / `npm run dev` | Dev with autoReload (sqlite or postgres) |
| `npm run build` | Build admin panel |
| `npm run start` | Start production (no reload) |
| `npm run console` | Strapi console REPL |
| `npm run strapi` | CLI passthrough |

## Deployment Notes

- **Self-hosted Strapi (free):** Deploy to Render / Railway / Fly.io / VPS — set all `APP_KEYS` etc. from `.env`, and `DATABASE_URL` (Supabase postgres) + Cloudinary env vars.
- **Strapi Cloud** is paid — avoid for free-tier compliance; use self-host.
- Always `npm run build` before `npm run start` in production.
- Supabase: enable **Connection Pooling** (pgbouncer) and use port `6543` in `DATABASE_URL`; direct `5432` also works but pooling is recommended for serverless.

## Troubleshooting

- `Unsupported DATABASE_CLIENT` → check `.env` spelling.
- `SELF_SIGNED_CERT` with Supabase → keep `DATABASE_SSL=true` and `rejectUnauthorized=true` (default).
- Uploads 404 → verify `CLOUDINARY_*` set; otherwise local `public/uploads` is used.
- GraphQL 404 → ensure plugin installed and server restarted.
- Public 403 on REST → Admin → Users-Permissions → Public → enable find/findOne per type.

---

© 2025 Kuyakhanya FM — MIT
