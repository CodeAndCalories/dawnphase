# Dawn Phase

Cycle and perimenopause tracking SaaS — [dawnphase.com](https://dawnphase.com)

## Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | Next.js 15 — Cloudflare Pages           |
| Backend    | Hono — Cloudflare Worker                |
| Database   | Cloudflare D1 (SQLite at the edge)      |
| Auth       | JWT — signed/verified in the Worker     |
| Email      | Resend                                  |
| Payments   | Stripe (subscriptions + webhooks)       |
| Styling    | Tailwind CSS v4                         |

## Repo layout

```
dawnphase/
├── apps/
│   ├── web/        # Next.js frontend  →  Cloudflare Pages
│   └── worker/     # Hono API          →  Cloudflare Worker
├── .gitignore
├── package.json    # workspace root
└── README.md
```

---

## Local development

### 1 — Prerequisites

- **Node.js 20+**
- **Wrangler CLI** — `npm i -g wrangler`
- A **Cloudflare account** (free tier is fine for local dev)
- A **Stripe** account (for payment routes — test mode keys work)
- A **Resend** account (for email — free tier sends 100 emails/day)

### 2 — Install dependencies

```bash
npm install          # installs all workspaces from the repo root
```

### 3 — Environment variables

```bash
# Web
cp apps/web/.env.local.example apps/web/.env.local

# Worker
cp apps/worker/.env.example apps/worker/.env
```

Fill in every value before starting the dev servers:

**`apps/web/.env.local`**

| Key | Description |
|-----|-------------|
| `NEXT_PUBLIC_WORKER_URL` | Worker dev URL, e.g. `http://localhost:8787` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_…`) |
| `NEXT_PUBLIC_APP_URL` | Local frontend URL, e.g. `http://localhost:3000` |

**`apps/worker/.env`** — loaded by Wrangler as `.dev.vars` locally

| Key | Description |
|-----|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_…`) |
| `RESEND_API_KEY` | Resend API key (`re_…`) |
| `JWT_SECRET` | Long random string — use `openssl rand -hex 32` |
| `APP_URL` | Frontend URL, e.g. `http://localhost:3000` |

### 4 — Create the local D1 database

```bash
cd apps/worker
npx wrangler d1 create dawnphase-db          # first time only
# Paste the database_id it prints into wrangler.toml
npx wrangler d1 migrations apply dawnphase-db --local
```

### 5 — Start both dev servers

```bash
# From the repo root — starts web (port 3000) and worker (port 8787) together
npm run dev

# Or individually
npm run dev -w apps/web
npm run dev -w apps/worker
```

---

## Deployment — Cloudflare

### Worker

```bash
cd apps/worker

# 1. Apply migrations to production D1
npx wrangler d1 migrations apply dawnphase-db

# 2. Set production secrets (run once per secret)
npx wrangler secret put JWT_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put APP_URL

# 3. Deploy
npx wrangler deploy
```

### Web (Cloudflare Pages)

**Option A — Git integration (recommended)**

1. Push this repo to GitHub.
2. In the Cloudflare dashboard → **Pages** → **Connect to Git** → select the repo.
3. Set build command to `npm run build:pages` and output directory to `.vercel/output/static`.
4. Add the three `NEXT_PUBLIC_*` environment variables in the Pages settings.

**Option B — CLI**

```bash
cd apps/web
npx @cloudflare/next-on-pages          # builds the Pages bundle
npx wrangler pages deploy .vercel/output/static --project-name dawnphase
```

### Stripe webhook

After deploying the Worker, register the webhook endpoint in the Stripe dashboard:

- **Endpoint URL:** `https://<your-worker>.workers.dev/stripe/webhook`
- **Events to listen for:** `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`

Copy the signing secret (`whsec_…`) and set it as the `STRIPE_WEBHOOK_SECRET` Worker secret.

---

## Database migrations

Migration files live in `apps/worker/migrations/`. Wrangler applies them in filename order.

```bash
# Local
npx wrangler d1 migrations apply dawnphase-db --local

# Production
npx wrangler d1 migrations apply dawnphase-db
```

To create a new migration:

```bash
npx wrangler d1 migrations create dawnphase-db <description>
# e.g. npx wrangler d1 migrations create dawnphase-db add_bbtemp_column
```

---

## Project conventions

- **All dates** stored as `TEXT` in `YYYY-MM-DD` format (SQLite has no native date type).
- **JSON columns** (`mood`, `custom_symptoms`) are stored as JSON strings and parsed in the Worker before returning to the client.
- **Secrets** are never committed. Use `wrangler secret put` for production and `.dev.vars` (git-ignored) for local.
- **Auth** — every protected route requires `Authorization: Bearer <jwt>`. The Worker verifies the signature and expiry using the Web Crypto API (no external JWT library).
