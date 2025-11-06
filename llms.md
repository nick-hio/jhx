# jhx Monorepo – LLM Context Document

## Table of Contents

<!-- TOC -->
* [jhx Monorepo – LLM Context Document](#jhx-monorepo--llm-context-document)
  * [Table of Contents](#table-of-contents)
  * [1. Monorepo Structure](#1-monorepo-structure)
  * [2. Monorepo Packages](#2-monorepo-packages)
  * [3. Package Versioning](#3-package-versioning)
<!-- TOC -->

---

## 1. Monorepo Structure

```
Root
  package.json            Monorepo scripts (Turbo orchestrated)
  turbo.json              Turbo task graph/caching config
  pnpm-workspace.yaml     pnpm workspace package boundaries
  llms.md                 (This file)
  apps/
  packages/
    jhx/                  Core package (jhx)
    elysia/               Adapter package for Elysia (@jhxdev/elysia)
    express/              Adapter package for Express (@jhxdev/express)
    fastify/              Adapter package for Fastify (@jhxdev/fastify)
    hono/                 Adapter package for Hono (@jhxdev/hono)
    server/               Internal server composition helpers for adapter packages (@jhxdev/server – private)
  configs/
    eslint-config/        Shared internal ESLint configuration (@repo/eslint-config)
    typescript-config/    Shared internal tsconfig configuration (@repo/typescript-config)
    rollup-config/        Shared internal Rollup configuration for type bundling (@repo/rollup-config)
    esbuild-config/       Shared internal esbuild script (@repo/esbuild-config)
    prettier-config/      Shared internal Prettier configuration (@repo/prettier-config)
```

---

## 2. Monorepo Packages

- [`jhx`](packages/jhx/README.md) - Core Package.
- [`@jhxdev/server`](packages/server) - Internal server composition helpers for framework adapters (private, not published). Depends on `jhx`.
- [`@jhxdev/elysia`](packages/elysia/README.md) - Adapter Package for the Elysia framework. Depends on `jhx` and `@jhxdev/server`.
- [`@jhxdev/express`](packages/express/README.md) - Adapter Package for the Express framework. Depends on `jhx` and `@jhxdev/server`.
- [`@jhxdev/fastify`](packages/fastify/README.md) - Adapter Package for the Fastify framework. Depends on `jhx` and `@jhxdev/server`.
- [`@jhxdev/hono`](packages/hono/README.md) - Adapter Package for the Hono framework. Depends on `jhx` and `@jhxdev/server`.

---

## 3. Package Versioning

This project uses a **Leading Zero Major** strategy for versioning (`0.MINOR.{MINOR+PATCH}`):
- **First segment** (`X.0.0`): Always zero for all versions.
- **Second segment** (`0.X.0`): Incremented for new features and breaking changes (e.g., `0.1.0` → `0.2.0`).
- **Third segment** (`0.0.X`): Incremented for bug fixes and minor improvements. Permitted to skip numbers (e.g., `0.2.0` → `0.2.2` → `0.2.4`).

Versioning Examples:
```text
0.3.2   /* Third "major" release, second patch */
0.3.5   /* Third "major" release, fifth patch */
0.4.0   /* Fourth "major" release, initial patch */
```
