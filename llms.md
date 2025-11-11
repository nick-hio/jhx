# jhx Monorepo – LLM Context Document

## Table of Contents

- [1. Monorepo Structure](#1-monorepo-structure)
- [2. Monorepo Packages](#2-monorepo-packages)
- [3. Package Versioning](#3-package-versioning)

---

## 1. Monorepo Structure

- `package.json` - Monorepo scripts (Turborepo orchestrated)
- `turbo.json` - Turborepo task graph/caching config
- `pnpm-workspace.yaml` - pnpm workspace package boundaries
- `llms.md` - (This file)
- `apps/` - Applications (published and private)
  - `docs/` - Documentation site repo using Fastify with Vercel deployment
  - `playground/` - Internal repo for testing and development
- `assets/` - Assets for documentation and branding
  - `jhx-logo-dark-background.svg` - Logo dark backgrounds
  - `jhx-logo-light-background.svg` - Logo light backgrounds
- `packages/` - Repositories for packages (published and private)
  - `jhx/` - Core repo (jhx)
  - `elysia/` - Elysia framework adapter repo (`@jhxdev/elysia`)
  - `express/` - Express framework adapter repo (`@jhxdev/express`)
  - `fastify/` - Fastify framework adapter repo (`@jhxdev/fastify`)
  - `hono/` - Hono framework adapter repo (`@jhxdev/hono`)
  - `server/` - Internal repo with server composition helpers for adapter packages (`@jhxdev/server` – private)
- `configs/` - Shared internal configuration repositories (private)
  - `eslint-config/` - ESLint configuration (`@repo/eslint-config`)
  - `prettier-config/` - Prettier configuration (`@repo/prettier-config`)
  - `rollup-config/` - Rollup configuration for type bundling (`@repo/rollup-config`)
  - `scripts-config/` - Scripts for building and bundling (`@repo/scripts-config`)
  - `typescript-config/` - TypeScript configuration (`@repo/typescript-config`)

---

## 2. Monorepo Packages

- [`jhx`](packages/jhx/README.md) - Core Package.
- [`@jhxdev/server`](packages/server) - Internal server composition helpers for framework adapters (private, not published). Depends on `jhx`.
- [`@jhxdev/elysia`](packages/elysia/README.md) - Adapter Package for the Elysia framework. Depends on `jhx`. Uses alias to `@jhxdev/server`.
- [`@jhxdev/express`](packages/express/README.md) - Adapter Package for the Express framework. Depends on `jhx`. Uses alias to `@jhxdev/server`.
- [`@jhxdev/fastify`](packages/fastify/README.md) - Adapter Package for the Fastify framework. Depends on `jhx`. Uses alias to `@jhxdev/server`.
- [`@jhxdev/hono`](packages/hono/README.md) - Adapter Package for the Hono framework. Depends on `jhx`. Uses alias to `@jhxdev/server`.

---

## 3. Package Versioning

This project uses a **Leading Zero Major** strategy for versioning (`0.MINOR.(MINOR+PATCH)`):
- **First segment** (`X.0.0`): Always zero for all versions
- **Second segment** (`0.X.0`): Incremented for new features and breaking changes (e.g., `0.1.0` → `0.2.0`)
- **Third segment** (`0.0.X`): Incremented for bug fixes and minor improvements. Number is determined by calculating (); permitted to skip numbers (e.g., `0.2.0` → `0.2.2` → `0.2.4`)

Versioning Examples:
```text
0.5.2   /* Release N: fifth version, second patch */
0.5.5   /* Release N+1: fifth version, fifth patch */
0.6.0   /* Release N+2: sixth version, initial patch */
```
