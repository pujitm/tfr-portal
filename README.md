# Project Setup

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` using [`pnpm`](https://pnpm.io/).

- [T3 Discord](https://t3.gg/discord)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

Technologies used:

- [React Docs](https://react.dev/learn)
- [Next.js](https://nextjs.org)
- [~~NextAuth.js~~](https://next-auth.js.org) [Clerk User Management](https://clerk.com/)
- [Prisma](https://prisma.io) (iffy on serverless tho)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Deployed on Vercel.

## Project Structure

- `public` -> static files hosted at root of deployment, served via CDN
- `package.json` -> dependencies and task scripts, `pnpm-lock.yaml` is the lockfile
- `.env.example` -> example of environment variable override for local development
- `src` has source code

### Source Code Structure

- `pages` -> everything under this directly corresponds to a route on the website. `_app.tsx` is behind-the-scenes setup that all pages share. Ignore `pages/api`, prefer using trpc routes under `server/api/routers/*`
- `env.mjs` -> Strongly typed and validated environment config
- `styles` -> tailwind setup
- `utils` -> Client-side utilities
- `server` -> server-side setup. API code lives in `server/api/routers/*`. Add routers to `server/root.ts`.
- `ui` -> components, layouts, wrappers. Bucket for visual UI.

## How to run

Run this in terminal:

```bash
pnpm install
pnpm dev
```
