# AGENTS.md

## Setup commands
- Install deps: `pnpm install`
- Go to package: `cd packages/...`
- Typecheck types: `pnpm typecheck`
- Lint code: `pnpm lint`
- Test code: `pnpm test`
- Pretty-ify code: `pnpm format`
- Run typecheck, lint, tests, and format: `pnpm validate`
- Build package: `pnpm build`

## Monorepo
This monorepo is managed using **Turborepo** for efficient task running and caching. This monorepo houses the core `jhx` package along with framework adapter packages for Express, Fastify, Hono, Elysia and more
- `jhx` - Core Package.
- `@jhxdev/server` - Internal server composition helpers for framework adapters, private not published (depends on `jhx`)
- `@jhxdev/elysia` - Adapter Package for the Elysia framework (depends on `jhx` and uses a directory alias to incorporate `@jhxdev/server`)
- `@jhxdev/express` - Adapter Package for the Express framework (depends on `jhx` and uses a directory alias to incorporate `@jhxdev/server`)
- `@jhxdev/fastify` - Adapter Package for the Fastify framework (depends on `jhx` and uses a directory alias to incorporate `@jhxdev/server`)
- `@jhxdev/hono` - Adapter Package for the Hono framework (depends on `jhx` and uses a directory alias to incorporate `@jhxdev/server`)

## Structure
- `package.json` - Monorepo scripts (Turborepo orchestrated)
- `turbo.json` - Turborepo task graph/caching config
- `pnpm-workspace.yaml` - pnpm workspace package boundaries
- `/apps` - Applications (published and private)
   - `/docs` - Documentation site repo using Fastify with Vercel deployment
   - `/playground` - Internal repo for testing and development
- `/assets` - Assets for documentation and branding
- `/packages` - Repositories for packages (published and private)
   - `/jhx` - Core repo (`jhx`)
   - `/elysia` - Elysia framework adapter repo (`@jhxdev/elysia`)
   - `/express` - Express framework adapter repo (`@jhxdev/express`)
   - `/fastify` - Fastify framework adapter repo (`@jhxdev/fastify`)
   - `/hono` - Hono framework adapter repo (`@jhxdev/hono`)
   - `/server` - Internal repo with server composition helpers for adapter packages (`@jhxdev/server` – private)
- `/configs` - Shared internal configuration repositories (private)
   - `/eslint-config` - ESLint configuration, contains the base `esling.config.js` file as `base.js` (`@repo/eslint-config`)
   - `/prettier-config` - Prettier configuration, contains the base `prettier.config.js` file as `base.js` (`@repo/prettier-config`)
   - `/rollup-config` - Rollup configuration for type bundling, contains the base `rollup.config.js` file as `base.js` (`@repo/rollup-config`)
   - `/scripts-config` - Scripts for building and bundling, contains the ESBuild `build.js` file and package JSON preparation `prepack.js` file (`@repo/scripts-config`)
   - `/typescript-config` - TypeScript configuration, contains the base `tsconfig.json` file as `base.js` (`@repo/typescript-config`)

## Versioning
This project uses a **Leading Zero Major** strategy for versioning (`0.MINOR.(MINOR+PATCH)`):
- The first segment, `X.0.0`, is always zero for all versions
- The second segment, `0.X.0`, incremented for new features and breaking changes (e.g., `0.1.0` → `0.2.0`)
- The third segment, `0.0.X`, incremented for bug fixes and minor improvements (e.g., `0.2.0` → `0.2.2` → `0.2.4`)
Version Examples:
- `0.5.2`: fifth version, second patch
- `0.5.5`: fifth version, fifth patch
- `0.6.0`: sixth version, initial patch
