# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

### Local (one port — preferred)

- `pnpm run dev:local` — build the React app (`BASE_PATH=/`) then start the API on **http://localhost:8081/**; Express serves `artifacts/press-conference-sim/dist/public` and `/api` from the same origin
- `pnpm run build:web` then `pnpm run start:local` — rebuild frontend only, then start an already-built API on 8081
- Optional hot-reload: Vite on 5173 (`PORT=5173 BASE_PATH=/ pnpm --filter @workspace/press-conference-sim run dev`) proxies `/api` to `http://127.0.0.1:8081`

### Other commands

- `pnpm --filter @workspace/api-server run dev` — API only (set `PORT`; serves the SPA if `press-conference-sim/dist/public` exists)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env for scoring: `ANTHROPIC_API_KEY` (do not commit). Optional: `DATABASE_URL` for Postgres

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
