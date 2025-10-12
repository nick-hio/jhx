# jhx Monorepo – LLM Context Document (`llms.md`)

This file supplies high‑signal architectural and full semantic context about the repository for downstream use by large language models (GPT‑5+, Claude, Gemini, etc.). It explains structure, intent, relationships, conventions, and extension patterns so an LLM can safely reason about or modify the codebase.

The `llms-mini.md` file contains a condensed version of this document for quick reference.

---

## Table of Contents

<!-- TOC -->
* [jhx Monorepo – LLM Context Document (`llms.md`)](#jhx-monorepo--llm-context-document-llmsmd)
  * [Table of Contents](#table-of-contents)
  * [1. High‑Level Overview](#1-highlevel-overview)
    * [1.1. Core Idea for `jhx` and Adapters](#11-core-idea-for-jhx-and-adapters)
  * [2. Monorepo Layout](#2-monorepo-layout)
  * [3. Package Roles & Dependencies](#3-package-roles--dependencies)
  * [4. Core Package (`jhx`)](#4-core-package-jhx)
    * [4.1. Design Goals](#41-design-goals)
    * [4.2. Export Surface (from `src/index.ts`)](#42-export-surface-from-srcindexts)
    * [4.3. Internal Helpers](#43-internal-helpers)
    * [4.4. Configuration](#44-configuration)
    * [4.5. Core Functions and Types](#45-core-functions-and-types)
    * [4.6. Usage Examples](#46-usage-examples)
  * [5. Core Adapter Package (`@jhxdev/server`)](#5-core-adapter-package-jhxdevserver)
    * [5.1. Export Surface (from `src/index.ts`)](#51-export-surface-from-srcindexts)
    * [5.2. Internal Helpers](#52-internal-helpers)
    * [5.3. Generic Types](#53-generic-types)
    * [5.4. Configuration](#54-configuration)
    * [5.5. Core Functions and Types](#55-core-functions-and-types)
  * [6. Adapter Packages (`@jhxdev/*`)](#6-adapter-packages-jhxdev)
    * [6.1. Adapter Goals](#61-adapter-goals)
    * [6.2. Adapter Scripts](#62-adapter-scripts)
    * [6.3. Adapter Dependencies](#63-adapter-dependencies)
    * [6.4. Adapter Tests](#64-adapter-tests)
    * [6.5. Adapter Configuration](#65-adapter-configuration)
    * [6.6. Adapter Utilities](#66-adapter-utilities)
    * [6.7. Adapter Utility Usage Examples](#67-adapter-utility-usage-examples)
    * [6.8. `@jhxdev/elysia` - Adapter Package for Elysia framework](#68-jhxdevelysia---adapter-package-for-elysia-framework)
      * [6.8.1. Export Surface (from `src/index.ts`)](#681-export-surface-from-srcindexts)
      * [6.8.2. Internal Helpers](#682-internal-helpers)
      * [6.8.3. Configuration](#683-configuration)
      * [6.8.4. Usage Examples](#684-usage-examples)
      * [6.8.5. Tests](#685-tests)
    * [6.9. `@jhxdev/express` - Adapter Package for Express framework](#69-jhxdevexpress---adapter-package-for-express-framework)
      * [6.9.1. Export Surface (from `src/index.ts`)](#691-export-surface-from-srcindexts)
      * [6.9.2. Internal Helpers](#692-internal-helpers)
      * [6.9.3. Configuration](#693-configuration)
      * [6.9.4. Usage Examples](#694-usage-examples)
      * [6.9.5. Tests](#695-tests)
    * [6.10. `@jhxdev/fastify` - Adapter Package for Fastify framework](#610-jhxdevfastify---adapter-package-for-fastify-framework)
      * [6.10.1. Export Surface (from `src/index.ts`)](#6101-export-surface-from-srcindexts)
      * [6.10.2. Internal Helpers](#6102-internal-helpers)
      * [6.10.3. Configuration](#6103-configuration)
      * [6.10.4. Usage Examples](#6104-usage-examples)
      * [6.10.5. Tests](#6105-tests)
    * [6.11. `@jhxdev/hono` - Adapter Package for Hono framework](#611-jhxdevhono---adapter-package-for-hono-framework)
      * [6.11.1. Export Surface (from `src/index.ts`)](#6111-export-surface-from-srcindexts)
      * [6.11.2. Internal Helpers](#6112-internal-helpers)
      * [6.11.3. Configuration](#6113-configuration)
      * [6.11.4. Usage Examples](#6114-usage-examples)
      * [6.11.5. Tests](#6115-tests)
  * [7. Internal Packages (`@repo/*`)](#7-internal-packages-repo)
    * [7.1. `@repo/esbuild-config` - Shared esbuild Configuration](#71-repoesbuild-config---shared-esbuild-configuration)
      * [7.1.1. Export Surface](#711-export-surface)
      * [7.1.2. Usage Examples](#712-usage-examples)
    * [7.2. `@repo/eslint-config` - Shared ESLint Configuration](#72-repoeslint-config---shared-eslint-configuration)
      * [7.2.1. Export Surface](#721-export-surface)
      * [7.2.2. Usage Examples](#722-usage-examples)
    * [7.3. `@repo/prettier-config` - Shared Prettier Configuration](#73-repoprettier-config---shared-prettier-configuration)
      * [7.3.1. Export Surface](#731-export-surface)
      * [7.3.2. Usage Examples](#732-usage-examples)
    * [7.4. `@repo/rollup-config` - Shared Rollup Configuration](#74-reporollup-config---shared-rollup-configuration)
      * [7.4.1. Export Surface](#741-export-surface)
      * [7.4.2. Usage Examples](#742-usage-examples)
    * [7.5. `@repo/typescript-config` - Shared TypeScript Configuration](#75-repotypescript-config---shared-typescript-configuration)
      * [7.5.1. Export Surface](#751-export-surface)
      * [7.5.2. Usage Examples](#752-usage-examples)
  * [8. Tooling & Build System](#8-tooling--build-system)
    * [8.1. Turborepo (`turbo.json`)](#81-turborepo-turbojson)
    * [8.2. Package Manager](#82-package-manager)
    * [8.3. Compilers & Bundlers](#83-compilers--bundlers)
    * [8.4. Testing](#84-testing)
    * [8.5. Linting / Formatting](#85-linting--formatting)
    * [8.6. TypeScript](#86-typescript)
  * [9. Coding Conventions & Style](#9-coding-conventions--style)
  * [10. Version & Environment Notes](#10-version--environment-notes)
  * [11. Safe Refactoring Guidelines](#11-safe-refactoring-guidelines)
  * [12. Quick Glossary](#12-quick-glossary)
  * [13. Maintenance Notes](#13-maintenance-notes)
  * [14. Release & Publishing Flow](#14-release--publishing-flow)
  * [15. Versioning](#15-versioning)
    * [15.1. Versioning Guidelines](#151-versioning-guidelines)
    * [15.2. Versioning Examples](#152-versioning-examples)
  * [16. Package Matrix (At a Glance)](#16-package-matrix-at-a-glance)
<!-- TOC -->

---

## 1. High‑Level Overview

This is a multi-package TypeScript monorepo (managed with pnpm + Turborepo) for building a lightweight React/HTMX integration layer called `jhx`, plus framework/server adapters (Fastify, Express, Hono, Elysia, and more). Supporting config packages (ESLint, TypeScript, Rollup, Esbuild, Prettier) provide consistent tooling. Some packages are publishable, others are internal.

### 1.1. Core Idea for `jhx` and Adapters

Enable ergonomic authoring of HTMX (https://htmx.org) attributes in React/JSX via a small abstraction (`jhx`) that converts higher-level props into proper `hx-*` attributes (and related event / target / swap semantics) with optional stringification and adapter-specific integration points.

---

## 2. Monorepo Layout

```
Root
  package.json            Monorepo scripts (Turbo orchestrated)
  turbo.json              Turbo task graph/caching config
  pnpm-workspace.yaml     pnpm workspace package boundaries
  llms.md                 (This file)
  apps/
  packages/
    jhx/                  Core library (jhx)
    fastify/              Fastify adapter (@jhxdev/fastify)
    express/              Express adapter (@jhxdev/express)
    hono/                 Hono adapter (@jhxdev/hono)
    elysia/               Elysia adapter (@jhxdev/elysia)
    server/               Internal server composition helpers for adapter packages (@jhxdev/server – private)
  configs/
    eslint-config/        Shared internal ESLint configuration (@repo/eslint-config)
    typescript-config/    Shared internal tsconfig configuration (@repo/typescript-config)
    rollup-config/        Shared internal Rollup configuration for type bundling (@repo/rollup-config)
    esbuild-config/       Shared internal esbuild configuration and helpers (@repo/esbuild-config)
    prettier-config/      Shared internal Prettier configuration (@repo/prettier-config)
```

---

## 3. Package Roles & Dependencies

- `jhx`: Core library; depends on `react` and `htmx.org`. (See [Section 4](#4-core-package-jhx)).
- `@jhxdev/server`: Private package with core adapter to be used by the other adapter packages; depends on `jhx`, with `react`, and `react-dom` as peers. (See [Section 5](#5-core-adapter-package-jhxdevserver)).
- `@jhxdev/elysia`: Elysia framework adapter; depends on `jhx` and `@jhxdev/server`, with `elysia`, `react`, and `react-dom` as peers. (See [Section 6.8](#68-jhxdevelysia---adapter-package-for-elysia-framework)).
- `@jhxdev/express`: Express framework adapter; depends on `jhx` and `@jhxdev/server`, with `express`, `react`, and `react-dom` as peers. (See [Section 6.9](#69-jhxdevexpress---adapter-package-for-express-framework)).
- `@jhxdev/fastify`: Fastify framework adapter; depends on `jhx` and `@jhxdev/server`, with `fastify-plugin`, `fastify`, `react`, and `react-dom` as peers. (See [Section 6.10](#610-jhxdevfastify---adapter-package-for-fastify-framework)).
- `@jhxdev/hono`: Hono framework adapter; depends on `jhx` and `@jhxdev/server`, with `hono`, `react`, and `react-dom` as peers. (See [Section 6.11](#611-jhxdevhono---adapter-package-for-hono-framework)).
- `@repo/esbuild-config`: Internally shared esbuild tooling/configuration; no runtime dependencies on application code. (See [Section 7.1](#71-repoesbuild-config---shared-esbuild-configuration)).
- `@repo/eslint-config`: Internally shared ESLint tooling/configuration; no runtime dependencies on application code. (See [Section 7.2](#72-repoeslint-config---shared-eslint-configuration)).
- `@repo/prettier-config`: Internally shared Prettier tooling/configuration; no runtime dependencies on application code. (See [Section 7.3](#73-repoprettier-config---shared-prettier-configuration)).
- `@repo/rollup-config`: Internally shared Rollup tooling/configuration; no runtime dependencies on application code. (See [Section 7.4](#74-reporollup-config---shared-rollup-configuration)).
- `@repo/typescript-config`: Internally shared TypeScript tooling/configuration; no runtime dependencies on application code. (See [Section 7.5](#75-repotypescript-config---shared-typescript-configuration)).

---

## 4. Core Package (`jhx`)

> Location: `packages/jhx`

Exports the core `jhx` function, `JhxComponent` React FC, types, utilities, and constants for transforming higher-level props into valid HTMX attributes and event handlers. This package is framework-agnostic and does not include any server or framework-specific logic.

### 4.1. Design Goals

- Pure transformation: no side effects beyond the provided logger.
- Deterministic and idempotent output for identical props/config.
- Strong types and overloads: return `string` or attribute record based on `stringify`; generic `TDom` passthrough for safe DOM interactions; inference‑friendly.
- React 18/19 compatible; SSR/edge safe; ESM/CJS with `.d.ts`.
- Framework‑agnostic core; server details live in adapters.
- Safe serialization: HTML‑escaped attributes; inline handler extraction without scope leaks; no `eval`; no global mutation.
- Ergonomic HTMX authoring: concise sugar for `get/post`, `swap`, `target`, `trigger`, and htmx events with consistent naming.
- Configurable per instance and per call: `stringify` override, pluggable logger, sensible defaults.
- Small, tree‑shakeable footprint with minimal dependencies.
- Extensible constants/helpers to accommodate new htmx semantics without breaking changes.
- Helpful, typed errors with actionable messages.
- Testable and predictable behavior, including stable attribute ordering.

### 4.2. Export Surface (from `src/index.ts`)

- Types:
  - `src/types`: Types directory with general types for jhx (e.g., props, config, etc.).
  - `src/types/htmx`: Types directory with base and extended htmx types (from the `htmx.org` package).
  - `src/types/attributes`: Types directory with advanced htmx types for jhx.
- JSX Components:
  - `src/components/JhxComponent.tsx`: `JhxComponent` React FC that maps the jhx result to component attributes and renders with a chosen tag (via the `as` prop; default `div`).
- Functions / Utilities:
  - `src/lib/attributes-to-string.ts`: `attributesToString` function to serialize an attribute object, outputted by the `jhx` function, into HTML-safe string (escapes quotes).
  - `src/lib/default-config.ts`: `defaultConfig` object for default `jhx` config values (`logger` + `stringify`).
  - `src/lib/htmx/*`: Objects containing constant values for htmx semantics (e.g. method, swap, trigger, sync strategy, headers, events).
  - `src/lib/jhx.ts`: Core `jhx` function;
    1. Merges provided config with defaults.
    2. Transforms jhx props into valid htmx attributes (via `convertJhxAttributes`).
    3. Transforms jhx event-related props into valid htmx event attributes (via `convertJhxEventAttributes`).
    4. If `stringify: true`, transforms DOM event handlers into in-line HTML event handlers (via `convertDomEventAttributes`).
    5. If `stringify: true`, the output is a valid HTML-safe string (via `attributesToString`), else the output is an attribute object (to be inserted into JSX props).
  - `src/lib/jhx-error.ts`: Custom error abstractions (`JhxErrorThrowable` Error class, `JhxError` type, `JhxValsError` type, and `JhxRequestError` type).

### 4.3. Internal Helpers

- `src/helpers/convert-dom-event-attributes.ts`: `convertDomEventAttributes` function to normalize/serialize event handlers into in-line HTML; only used if `stringify: true`.
- `src/helpers/convert-jhx-attributes.ts`: `convertJhxAttributes` function to map jhx props (e.g., `get`, `post`, `swap`, `target`, trigger sugar) to `hx-*` attributes.
- `src/helpers/convert-jhx-event-attributes.ts`: `convertJhxEventAttributes` function to map htmx events (e.g., `onHtmxAfterSwap` into `hx-on:afterSwap`) to `hx-*` attributes.
- `src/helpers/extract-function.ts`: `extractFunction` function to isolate a given function's body and parameters; used to serialize event handlers into in-line HTML event handler strings.
- `src/helpers/to-jhx-swap-attribute.ts`: `toJhxSwapAttribute` function to transform the complex `swap` prop shape into a canonical htmx attribute string.
- `src/helpers/to-jhx-target-attribute.ts`: `toJhxTargetAttribute` function to transform the complex `target` prop shape into a canonical htmx attribute string.
- `src/helpers/to-jhx-trigger-attribute.ts`: `toJhxTriggerAttribute` function to transform the complex `trigger` prop shape into a canonical htmx attribute string.

### 4.4. Configuration

The `JhxConfig` type contains:

- `logger: Logger`: Object with logging methods (default: `console`)
- `stringify: boolean`: Boolean controlling whether the output is an HTML-safe string or attribute object (default: `false`)

### 4.5. Core Functions and Types

- `Logger` Type

```typescript
export interface Logger {
    debug: (msg: string, ...args: any[]) => void;
    error: (msg: string, ...args: any[]) => void;
    info: (msg: string, ...args: any[]) => void;
    warn: (msg: string, ...args: any[]) => void;
}
```

- `JhxConfig` Type

```typescript
export interface JhxConfig {
    logger?: Logger;
    stringify?: boolean;
}
```

- `JhxProps` Type

```typescript
export type JhxProps<TDom extends object = object> = HtmxProps<TDom>
    & HtmxEventProps<TDom>
    & JhxRouteProps & {};
```

- `JhxDomProps` Type

```typescript
export type JhxDomProps<TDom extends object = object> = HtmxProps<TDom>
    & HtmxEventProps<TDom>
    & JhxRouteProps
    & DomEventProps<TDom> & {};
```

- `jhx` Function

```typescript
export function jhx<TDom extends object = object>(
    props: JhxDomProps<TDom>,
    config: JhxConfig & { stringify: true },
): string;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom>,
    config: JhxConfig & { stringify: false },
): Record<string, string>;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom>,
    config?: JhxConfig,
): Record<string, string>;
export function jhx<TDom extends object = object>(
    props: JhxProps<TDom> | JhxDomProps<TDom>,
    config?: JhxConfig,
): string | Record<string, string> {
    /* ... */
}
```

- `attributesToString` Function

```typescript
export const attributesToString = (attributes: Record<string, unknown>): string => {
    return Object.entries(attributes)
        .map(([key, value]) => `${key}="${escapeValue(value)}"`)
        .filter(Boolean)
        .join(' ');
};
```

### 4.6. Usage Examples

```typescript jsx
import { jhx } from 'jhx';

// 1) `jhx` function usage
jhx({
    get: '/api/data',
    target: '#content',
    swap: 'outerHTML',
    trigger: 'click',
    onHtmxAfterSwap: (event) => {
        console.log('Content swapped!', event);
    },
    // other props as needed
})

// 2) `jhx` function usage with custom configuration
jhx({
    get: '/api/data',
    target: '#content',
    swap: 'outerHTML',
    trigger: 'click',
    onHtmxAfterSwap: (event) => {
        console.log('Content swapped!', event);
    },
    // other props as needed
}, {
    logger: console,
    stringify: true,
})

// 3) `jhx` function usage in HTML (with `stringify: true`)
const html = `
    <div
        ${jhx({
            get: '/api/data',
            target: '#content',
            swap: 'outerHTML',
            trigger: 'click',
            onHtmxAfterSwap: (event) => {
                console.log('Content swapped!', event);
            },
            // other props as needed
        }, {
            stringify: true, // ensure output is a string
        })}
    >
        Click Me
    </div>
`;

// 4) `jhx` function usage with custom JSX component
const CustomComponent = () => (
    <button
        {...jhx({
            get: '/api/data',
            target: '#content',
            swap: 'outerHTML',
            trigger: 'click',
            onHtmxAfterSwap: (event) => {
                console.log('Content swapped!', event);
            },
            // other props as needed
        })}
    >
        Click Me
    </button>
);

// 5) `JhxComponent` JSX component usage
import { JhxComponent } from 'jhx';
const CustomJhxComponent = () => (
    <JhxComponent
        as="button" // custom tag (default is 'div')
        get="/api/data"
        target="#content"
        swap="outerHTML"
        trigger="click"
        onHtmxAfterSwap={(event) => {
            console.log('Content swapped!', event);
        }}
        // other props as needed
    >
        Click Me
    </JhxComponent>
);

// 6) `attributesToString` function usage
import { attributesToString } from 'jhx';
const attrString = attributesToString({
    'hx-get': '/api/data',
    'hx-target': '#content',
    'hx-swap': 'outerHTML',
    'hx-trigger': 'click',
});
```

---

## 5. Core Adapter Package (`@jhxdev/server`)

> Location: `packages/server`

Exports generic server integration functions, utilities, and types for building framework-specific adapters. This package is intended for internal use by the adapter packages only.

- Private package, not published.
- Depends on `jhx`, with `react` and `react-dom` as peers.
- Mostly generics and types.
- No bundling step (no `dist`); exports source directly.
- Used by other adapter packages via tsconfig path aliasing and Rollup aliasing.
- May contain different tests than the other adapter packages.

### 5.1. Export Surface (from `src/index.ts`)

- `src/types.ts`: Generic and extendable types for server adapters (handler signatures, route shapes, config types, registration callback, instance options generic).
- `src/lib/base.ts`: Base primitives and types for adapters to directly export in their packages.
- `src/lib/create-jhx.ts`: Exports a `createServerJhx` function factory that merges defaults, builds the route map, normalizes/validates endpoints, resolves render mode, wires middleware/error/not‑found, and returns the curried jhx, JhxComponent, and registration utilities for framework bindings.
- `src/lib/create-jhx-component.tsx`: Exports a `createJhxComponent` function factory returning a React FC bound to the curried `jhx` and config, mapping jhx output to JSX attributes.
- `src/lib/default-config.ts`: Exports a `defaultConfig` object for default server adapter config (content type, debug flag, prefix, render mode/flags, trailing slash policy, routes, middleware) plus core `jhx` defaults.
- `src/lib/jhx-server-error.ts`: Custom error abstractions (`JhxServerException` Error class, `JhxServerError` type, and `JhxServerErrorType` type).

### 5.2. Internal Helpers

- `src/helpers/add-routes-to-map.ts`: `addRoutesToMap` function to add one or more routes to the routes Map keyed by `[method, normalizedEndpoint]`, applies prefix/trailing‑slash policy, dedupes by handler hash, and throws on conflicts.
- `src/helpers/get-render-function.ts`: `getRenderFunction` function to resolve a concrete render function from `config.render` (`'static'`, `'string'`, custom handler, or `false`) and returns a callable that renders JSX and supplies the correct content type.
- `src/helpers/hash-function.ts`: `hashFunction` function to hash functions/handlers (based on `toString()` with deterministic hashing) used to detect duplicate route handlers.
- `src/helpers/normalize-endpoint.ts`: `normalizeEndpoint` function to normalize endpoints by ensuring leading slash, applying `config.prefix`, collapsing duplicate slashes, and enforcing the `trailingSlash` strategy.
- `src/helpers/validate-routes.ts`: `validateRoutes` function to validate an array of routes (supported methods, unique `[method, endpoint]`, correct shapes) and throws `JhxServerError` with context on violations.

### 5.3. Generic Types

The following generic types are used throughout the package and extended in adapter packages to strongly type handlers, routes, config, and the curried `jhx` and `JhxComponent`:

- `TDomBase extends object`: Base shape for DOM props supported by the `jhx` helper and `JhxComponent`; merged with per-call DOM props.
- `TReturn`: The raw return type of Route/Middleware/Not Found/Error handlers before rendering. Can be synchronous or a `Promise`. Becomes the `TResolved` type after awaiting and handling.
- `TResolved`: The payload type consumed by the render step. Usually `Awaited<TReturn>` (e.g., `ServerResolved<TReturn>`), but left generic to allow custom pre-render pipelines.
- `TRendered`: The type produced by the render function and ultimately delivered/sent (e.g., `string` for HTML, framework-specific response body types).
- `TError extends JhxErrorType`: Error type handled by the error handler. Constrained to `Error | JhxError | JhxServerError`.
- `TReq`: The request/context type passed to handlers and the render function. Framework-specific (e.g., Fastify request, Elysia context).
- `TRes`: The response type passed to handlers and the render function when the framework uses a `req, res` signature. If `never | undefined`, handlers use a single-argument `(context: TReq)` signature.
- `TBaseStringify extends boolean | undefined`: Compile-time default for the `jhx` helper’s `stringify` behavior and overloads.
  - `true` → `jhx(...)` returns `string` (DOM attributes string).
  - `false` → `jhx(...)` returns `Record<string, string>` (attributes map).
  - `undefined` → Both overloads available; runtime decides via config.
- `THandler extends ServerJhxHandler<TReturn, TReq, TRes>`: Route/Middleware/Not Found handler signature.
  - If `TRes` is `never | undefined`: `(context: TReq) => TReturn`.
  - Else: `(req: TReq, res: TRes) => TReturn`.
- `TErrorHandler extends ServerJhxErrorHandler<TError, TReturn, TReq, TRes>`: Error handler signature.
  - If `TRes` is `never | undefined`: `(error: TError, context: TReq) => TReturn`.
  - Else: `(error: TError, req: TReq, res: TRes) => TReturn`.
- `TRenderHandler extends ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes>`: Custom render function signature converting `TResolved` to `TRendered`.
  - If `TRes` is `never | undefined`: `(payload: TResolved, context: TReq) => TRendered`.
  - Else: `(payload: TResolved, request: TReq, response: TRes) => TRendered`.
- `TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>`: Fully normalized route entry stored/exposed by the router, with `method: HttpMethodUpperCase`, normalized `route: string`, and `handler: THandler`.
- `TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>`: User-provided route config (e.g., optional `method`, unnormalized path) and normalized internally.
- `TInstanceOptions`: Framework-specific instance options carried through the config/registration layer. Defaults to `undefined`.

### 5.4. Configuration

See the [5.3. Generic Types](#53-generic-types) section for generic types and descriptions.

The `ServerCreateJhxConfig` type is used with the `createServerJhx` function (and extended `createJhx` functions from other adapter packages) to configure the adapter instance and get the curried `jhx` function and `JhxComponent` JSX FC. The other adapter packages will extend this type. This type extends the `JhxConfig` type from the `jhx` package and adds the following properties:

- `contentType?: string`: Optional content type for responses (default: `text/html; charset=utf-8`).
- `debug?: boolean`: Optional debug flag to enable/disable debug logging (default: `false`).
- `errorHandler?: TErrorHandler`: Optional global error handler function (default: framework-specific default handling).
- `middleware?: THandler | Array<THandler>`: Optional middleware function(s) to run before route handlers (default: `[]`).
- `notFoundHandler?: THandler`: Optional not found handler function (default: empty 404 response).
- `onRegistered?: JhxOnRegistered`: Optional callback function invoked after each route is registered.
- `prefix?: string`: Optional prefix for all routes (default: `/_jhx`).
- `renderError?: boolean`: Optional flag to enable/disable using the render handler in the error handler (default: `true`).
- `renderMiddleware?: boolean`: Optional flag to enable/disable using the render handler in the middleware (default: `true`).
- `renderNotFound?: boolean`: Optional flag to enable/disable using the render handler in the not found handler (default: `true`).
- `render?: 'static' | 'string' | TRenderHandler | false`: Optional render handler function or mode (default: `'static'`).
- `routes?: TPartialRoute | Array<TPartialRoute>`: Optional route(s) to register on initialization (default: `[]`).
- `trailingSlash?: 'slash' | 'no-slash' | 'both'`: Optional trailing slash handling for routes (default: `'both'`).
- `instanceOptions?: TInstanceOptions`: Optional instance configuration options (adapter-specific; e.g., Fastify `routeOptions` type, Elysia `ElysiaConfig` type, etc.) (`TInstanceOptions` generic defaults to `undefined`).

### 5.5. Core Functions and Types

The following types and functions (not limited to) are exported from the `@jhxdev/server` package for use by adapter packages:

- `ServerJhxHandler` Type

```typescript
export type ServerJhxHandler<TReturn, TReq, TRes> = TRes extends never | undefined
    ? (context: TReq) => TReturn // Shape when TRes is `never` or `undefined` (e.g., Hono context, Elysia context, etc.)
    : (req: TReq, res: TRes) => TReturn; // Shape when TRes is defined (e.g., Express request & response, Fastify request & reply, etc.)
```

- `ServerJhxErrorHandler` Type

```typescript
export type ServerJhxErrorHandler<TError extends JhxErrorType, TReturn, TReq, TRes> = TRes extends | never | undefined
    ? (error: TError, context: TReq) => TReturn // Shape when TRes is `never` or `undefined` (e.g., Hono context, Elysia context, etc.)
    : (error: TError, req: TReq, res: TRes) => TReturn; // Shape when TRes is defined (e.g., Express request & response, Fastify request & reply, etc.)
```

- `ServerJhxRenderHandler` Type

```typescript
export type ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes> = TRes extends never | undefined
    ? (payload: TResolved, context: TReq) => TRendered // Shape when TRes is `never` or `undefined` (e.g., Hono context, Elysia context, etc.)
    : (payload: TResolved, request: TReq, response: TRes) => TRendered; // Shape when TRes is defined (e.g., Express request & response, Fastify request & reply, etc.)
```

- `ServerJhxRoute` Type

```typescript
export type ServerJhxRoute<
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>
> = {
    method: HttpMethodUpperCase;
    route: string;
    handler: THandler;
};
```

- `ServerJhxPartialRoute` Type

```typescript
export type ServerJhxPartialRoute<
    TReturn,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
> = {
    method?: HttpMethod;
    route: string;
    handler: THandler;
};
```

- `ServerCreateJhxConfig` Type

```typescript
export type ServerCreateJhxConfig<
    TReturn,
    TResolved,
    TRendered,
    TError extends JhxErrorType,
    TReq,
    TRes,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TErrorHandler extends ServerJhxErrorHandler<TError, TReturn, TReq, TRes>,
    TRenderHandler extends ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
    TInstanceOptions = undefined,
> = BaseJhxConfig & {
    contentType?: string | null;
    debug?: boolean;
    errorHandler?: TErrorHandler;
    middleware?: THandler | Array<THandler>;
    notFoundHandler?: THandler;
    onRegistered?: JhxOnRegistered;
    prefix?: string;
    renderError?: boolean;
    renderMiddleware?: boolean;
    renderNotFound?: boolean;
    render?: 'static' | 'string' | TRenderHandler | false;
    routes?: TPartialRoute | Array<TPartialRoute>;
    trailingSlash?: 'slash' | 'no-slash' | 'both';
    instanceOptions?: TInstanceOptions;
}
```

- `ServerJhx` Type

```typescript
export interface ServerJhx<
    TDomBase extends object,
    TReturn,
    TReq,
    TRes,
    TBaseStringify extends boolean | undefined,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
> {
    <TDom extends object | TDomBase = TDomBase>(
        options: ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>,
        config: BaseJhxConfig & { stringify: true },
    ): string;

    <TDom extends object | TDomBase = TDomBase>(
        options: ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
        config: BaseJhxConfig & { stringify: false },
    ): Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options: TBaseStringify extends true
            ? ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>
            : ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>,
        config?: BaseJhxConfig,
    ): TBaseStringify extends true ? string : Record<string, string>;

    <TDom extends object | TDomBase = TDomBase>(
        options:
            | ServerJhxProps<TDom, TReturn, TReq, TRes, THandler>
            | ServerJhxDomProps<TDom, TReturn, TReq, TRes, THandler>,
        config?: BaseJhxConfig,
    ): string | Record<string, string>;

    addRoute(newRoute: TPartialRoute): void;
    addRoutes(newRoutes: Array<TPartialRoute>): void;
    clearRoutes(): void;
    getRoute(method: string, path: string): TRoute | null;
    getRoutes(): Array<TRoute>;
    hasRoute(method: string, path: string): boolean;
    removeRoute(method: string, path: string): boolean;
}
```

- `createServerJhx` Function

```typescript
export const createServerJhx = <
    TDomBase extends object,
    TReturn,
    TResolved,
    TRendered,
    TError extends JhxErrorType,
    TReq,
    TRes,
    TBaseStringify extends boolean | undefined,
    THandler extends ServerJhxHandler<TReturn, TReq, TRes>,
    TErrorHandler extends ServerJhxErrorHandler<TError, TReturn, TReq, TRes>,
    TRenderHandler extends ServerJhxRenderHandler<TResolved, TRendered, TReq, TRes>,
    TBaseProps extends ServerJhxProps<TDomBase, TReturn, TReq, TRes, THandler>,
    TCompProps extends ServerJhxComponentProps<TDomBase, TReturn, TReq, TRes, THandler, TBaseProps>,
    TRoute extends ServerJhxRoute<TReturn, TReq, TRes, THandler>,
    TPartialRoute extends ServerJhxPartialRoute<TReturn, TReq, TRes, THandler>,
    TInstanceOptions = undefined
>(
    config: ServerCreateJhxConfig<
        TReturn,
        TResolved,
        TRendered,
        TError,
        TReq,
        TRes,
        THandler,
        TErrorHandler,
        TRenderHandler,
        TPartialRoute,
        TInstanceOptions
    > & {
        stringify?: TBaseStringify;
    },
    notFoundHandler: ServerJhxHandler<TReturn, TReq, TRes> | ((data: any, ..._args: any[]) => any),
    registerCatchAllRoute: (
        baseConfig: NormalizedServerJhxConfig<
            TReturn,
            TResolved,
            TRendered,
            TError,
            TReq,
            TRes,
            THandler,
            TErrorHandler,
            TRenderHandler,
            TPartialRoute,
            TInstanceOptions
        >,
        routes: Map<string, ServerJhxHandler<TReturn, TReq, TRes>>,
    ) => void,
): {
    jhx: ServerJhx<TDomBase, TReturn, TReq, TRes, TBaseStringify, THandler, TRoute, TPartialRoute>;
    JhxComponent: ServerJhxComponentType<TDomBase, TReturn, TReq, TRes, THandler, TBaseProps, TCompProps>;
} => {
    /* omitted for brevity */
}
```

---

## 6. Adapter Packages (`@jhxdev/*`)

### 6.1. Adapter Goals

- Provide ergonomic best-practice server-framework interop layers with the `jhx` package.
- Use the generic functions, types, and utilities provided from `@jhxdev/server` or `jhx` packages where possible.
- Provide useful type-safe abstractions and utilities for common use cases.
- Consistent behaviour between adapters and packages where possible (type names, function names, config shape, etc.).
- Keep adapters thin; they should delegate the majority of the transformation and logic to the `@jhxdev/server` and `jhx` packages where possible.
- Maintain consistent distribution shape; ESM (`.js`), CJS (`.cjs`), and types (`.d.ts`).

### 6.2. Adapter Scripts

All adapter packages share the same scripts:

- `build`: Builds and bundles the package (`pnpm run build:lib && pnpm run build:types`) via esbuild and Rollup.
- `build:lib`: Builds the `dist/index.js` ESM bundle and `dist/index.cjs` CJS bundle (`bun esbuild.config.js`) via esbuild.
- `build:types`: Builds the `dist/index.d.ts` types bundle (`rollup -c rollup.config.js`) via Rollup.
- `check-types`: Validates the types for the package (`tsc -p tsconfig.json --jsx preserve`).
- `format`: Formats the code (`prettier --write . --list-different`) via Prettier.
- `lint`: Lints the code (`eslint . --max-warnings 0`) via ESLint.
- `test`: Runs the tests (`bun test ./tests`) via Bun.
- `test:watch`: Runs tests in watch mode (`bun test --watch ./tests`) via Bun.

### 6.3. Adapter Dependencies

Each of the publicly available adapter packages share a core set of dependencies:

- Direct dependencies: `jhx` and `@jhxdev/server` (although, not listed).
  - Note: The `@jhxdev/server` package is not listed in any of the adapter's `package.json` files because the package is accessed via aliasing in the tsconfig and Rollup config (so that the raw types and functions can be exported from its private repo). The adapters rely on the source files directly from `../server/src`, since no `dist` bundle will be outputted by it.
- Peer dependencies: `react`, `react-dom`, and packages from their respective framework (e.g., `fastify`, `express`, `hono`, `elysia`, etc.).
- Dev dependencies: Shared tooling from `@repo/*` configs (TypeScript, ESLint, Prettier, esbuild, Rollup).

### 6.4. Adapter Tests

> The `@jhxdev/server` package may contain different tests than the other adapter packages. The `@jhxdev/fastify` package contains finished tests that can be used as a reference for building out the other adapter package tests.

All adapter packages include a `test` directory with tests to validate the functionality of the adapter. Tests should follow the recommended and best practices specific to each server framework. Each adapter package should include the following tests (the term "sent response" refers to the object or return value from the framework-specific response-sending function; e.g., `reply.send()` in Fastify, `res.send()` in Express, `c.text()` in Hono, etc.):

- Config tests (`test/config.test.tsx`):
  - `stringify` tests: default, true, false.
  - `routes` tests: pre-registered GET route test, pre-registered POST route test, pre-registered routes (GET & POST) test, pre-registered routes cannot use same route test.
- Middleware Handling tests (`test/middleware-handling.test.tsx`):
  - Response tests: returns sent response test (if the server framework provides a response-sending function), returns string, returns object (config.contentType), returns object (application/json header), returns `Response` test (if supported), returns buffer (config.contentType) test (if supported), returns buffer (application/octet-stream header) test (if supported), returns file buffer test(s) (if supported) (`fs.readFile`, any framework-specific function, and/or etc.), returns stream test(s) (if supported) (`ReadableStream`, `NodeJS.ReadableStream`, framework-specific streaming operation, and/or etc.).
  - JSX rendering tests: returns JSX, returns JSX (render=static), returns JSX (render=string), returns JSX (render=false).
  - Other tests: returns void, middleware error test.
- Middleware Error Handling tests (`test/middleware-error-handling.test.tsx`):
  - Response tests:
    - returns sent response test (if the server framework provides a response-sending function),
    - returns string,
    - returns object (config.contentType)
    - returns object (application/json header)
    - returns `Response` test (if supported)
    - returns buffer (config.contentType) test (if supported)
    - returns buffer (application/octet-stream header) test (if supported)
    - returns file buffer test(s) (if supported) (`fs.readFile`, any framework-specific function, and/or etc.)
    - returns stream test(s) (if supported) (`ReadableStream`, `NodeJS.ReadableStream`, framework-specific streaming operation, and/or etc.)
  - JSX rendering tests:
    - returns JSX.
    - returns JSX (render=static).
    - returns JSX (render=string).
    - returns JSX (render=false).
  - Other tests:
    - returns void.
- Route Not Found Handling tests (`test/not-found-handling.test.tsx`):
  - Response tests: returns sent response test (if the server framework provides a response-sending function), returns string, returns object (config.contentType), returns object (application/json header), returns `Response` test (if supported), returns buffer (config.contentType) test (if supported), returns buffer (application/octet-stream header) test (if supported), returns file buffer test(s) (if supported) (`fs.readFile`, any framework-specific function, and/or etc.), returns stream test(s) (if supported) (`ReadableStream`, `NodeJS.ReadableStream`, framework-specific streaming operation, and/or etc.).
  - JSX rendering tests: returns JSX, returns JSX (render=static), returns JSX (render=string), returns JSX (render=false).
  - Other tests: returns void.
- Render Handling tests (`test/render-handling.test.tsx`):
  - Response tests: returns sent response test (if the server framework provides a response-sending function), returns string, returns object (config.contentType), returns object (application/json header)
  - Other tests: returns void, render error test.
- Route Handling tests (`test/route-handling.test.tsx`):
  - Response tests: returns sent response test (if the server framework provides a response-sending function), returns string, returns object (config.contentType), returns object (application/json header), returns `Response` test (if supported), returns buffer (config.contentType) test (if supported), returns buffer (application/octet-stream header) test (if supported), returns file buffer test(s) (if supported) (`fs.readFile`, any framework-specific function, and/or etc.), returns stream test(s) (if supported) (`ReadableStream`, `NodeJS.ReadableStream`, framework-specific streaming operation, and/or etc.).
  - JSX rendering tests: returns JSX, returns JSX (render=static), returns JSX (render=string), returns JSX (render=false).
  - Other tests: returns void, route error test.
- Route Error Handling tests (`test/route-error-handling.test.tsx`):
  - Response type tests: returns sent response test (if the server framework provides a response-sending function), returns string, returns object (config.contentType), returns object (application/json header), returns `Response` test (if supported), returns buffer (config.contentType) test (if supported), returns buffer (application/octet-stream header) test (if supported), returns file buffer test(s) (if supported) (`fs.readFile`, any framework-specific function, and/or etc.), returns stream test(s) (if supported) (`ReadableStream`, `NodeJS.ReadableStream`, framework-specific streaming operation, and/or etc.).
  - JSX rendering tests: returns JSX, returns JSX (render=static), returns JSX (render=string), returns JSX (render=false).
- Routing tests (`test/routing.test.tsx`):
  - Registration tests: duplicate route handlers use the same route, duplicate route endpoints use the same route.

### 6.5. Adapter Configuration

All adapters extend a common configuration shape via the `ServerCreateJhxConfig` type from `@jhxdev/server`.

### 6.6. Adapter Utilities

All adapter packages share the following utilities for the curried `jhx` function:

- `jhx.addRoute`: Function to add a new route.
- `jhx.addRoutes`: Function to add multiple new routes.
- `jhx.clearRoutes`: Function to clear all registered routes.
- `jhx.getRoute`: Function to get a specific route by method and path.
- `jhx.getRoutes`: Function to get all registered routes.
- `jhx.hasRoute`: Function to check if a route exists by method and path.
- `jhx.removeRoute`: Function to remove a route by method and path.

### 6.7. Adapter Utility Usage Examples

Notes:
- The optional `route` property for new routes will default to a randomly generated 10-character unique endpoint string (e.g., "/_jhx/abcde12345").
- The optional `method` property for routes will default to the `GET` method.

```typescript jsx
// 1) Utility functions for route management
// Recommended operation to register a route
jhx({ handler: () => <div>hello</div> });

jhx.addRoute({ // void; throws on conflicts
    route: '/a',
    handler: () => 'A'
});
jhx.addRoutes([ // void; throws on conflicts
    {
        route: '/b',
        handler: () => 'B'
    },
    {
        route: '/c',
        handler: () => 'C'
    },
]);
jhx.clearRoutes(); // void
jhx.getRoute('GET', '/greet'); // { method, route, handler } | null
jhx.getRoutes(); // Array<{ method, route, handler }>
jhx.hasRoute('GET', '/a'); // true/false
jhx.removeRoute('get', '/b'); // true/false

// 2) Supported handler return types (see the `JhxHandlerReturn` type in the specific adapter for full list of return types)
// Rendered response (rendered via the `config.render` function)
jhx({
    route: '/jsx',
    handler: () => <div>ok</div>,
});

// Text response
jhx({
    route: '/text',
    handler: () => 'plain-text',
});

// JSON response ("application/json" response header may need to be set depending on the adapter configuration and framework)
jhx({
    route: '/json',
    handler: () => { message: 'ok' },
});

// 3) Attributes as string vs object (`config.stringify`)
// Default usage spreads the attributes object for JSX props
jhx({ handler: () => 'ok' }); // object

// Using `config.stringify` for a single `jhx` route (if not already set during `createJhx`),
// when you need a `jhx` route to return a raw attribute string (e.g., building HTML strings, `<button ${strAttrs}>Click</button>`)
jhx({ handler: () => 'ok' }, { stringify: true }); // string

// Using `config.stringify` for all `jhx` routes,
// when you need all `jhx` routes to return the raw attribute string (e.g., building HTML strings, `<button ${strAttrs}>Click</button>`)
const { jhx } = createJhx({ stringify: true }); // Example `createJhx` function from an adapter like `@jhxdev/express`
jhx({ route: '/a', handler: () => 'a' }); // string
jhx({ route: '/b', handler: () => 'b' }, { stringify: false }); // object; can be overridden per-call

// 4) JhxComponent usage
<JhxComponent
    as="button"
    handler={() => <div id="msg">Hi</div>}
    jhxConfig={{ logger: console }}
    // other props as needed
>
    Click Me
</JhxComponent>
```

### 6.8. `@jhxdev/elysia` - Adapter Package for Elysia framework

> Location: `packages/elysia`

Exports adapter functions, utilities, and types for the Elysia framework, enabling seamless integration of `jhx` with Elysia applications. Required dependency on the `@jhxdev/server` package, but it will not be listed in the `package.json` (accesses source directly via tsconfig aliasing and Rollup aliasing).

Contains the same utilities from the [Adapter Utilities](#64-adapter-tests) section when using the `elysiaJhx` plugin and `createJhx` function. See the [5.3. Generic Types](#53-generic-types) section for generic types and descriptions.

#### 6.8.1. Export Surface (from `src/index.ts`)

- `src/types.ts`: Elysia-specific types extending the generic types from `@jhxdev/server` (handler signatures, route shapes, config types, registration callback, instance options generic as `ElysiaConfig<string>` from the `elysia` package, etc.).
- `src/lib/base.ts`: Base primitives and types for Elysia adapter to directly export in the package.
- `src/lib/create-jhx.ts`: Exports a `createJhx` function factory that wraps `createServerJhx` from `@jhxdev/server`, providing Elysia-specific defaults, normalizing/validating endpoints, wiring middleware/error/not‑found, and returning the curried jhx, JhxComponent, and registration utilities for Elysia bindings.
- `src/lib/create-jhx-component.ts`: Exports a `createJhxComponent` function factory that wraps `createJhxComponent` from `@jhxdev/server`, returning a React FC bound to the curried jhx and config, mapping jhx output to JSX attributes.
- `src/lib/plugin.ts`: Exports a `elysiaJhx` function to decorate an existing Elysia instance with the `jhx` adapter.
- `src/lib/default-config.ts`: Exports a `defaultConfig` object for default Elysia adapter config (content type, debug flag, prefix, render mode/flags, trailing slash policy, routes, middleware) plus core `jhx` and `@jhxdev/server` defaults.

#### 6.8.2. Internal Helpers

- `src/helpers/is-response-handled.ts`: Exports an `isResponseHandled` function to check if the Elysia response has already been sent (via `context.response.writableEnded` and other operations).
- `src/helpers/send-payload.ts`: Exports a `sendPayload` function to send the payload via the Elysia response, setting the content type and handling different payload types (string, object, Response, etc.).

#### 6.8.3. Configuration

The `CreateJhxConfig` type extends the `ServerCreateJhxConfig` type from `@jhxdev/server` with the `TInstanceOptions` generic implemented as `ElysiaConfig<string>` from the `elysia` package.

See the [5.3. Generic Types](#53-generic-types) section for generic types and descriptions.

#### 6.8.4. Usage Examples

- Using the `elysiaJhx` plugin (recommended):

```typescript jsx
import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html'
import { elysiaJhx } from '@jhxdev/elysia';
import { renderToStaticMarkup } from "react-dom/server";

const app = new Elysia().use(html()); // The `html` plugin is not required for the `jhx` adapter, but is useful for Elysia-native JSX rendering

// 1) default configuration
app.use(elysiaJhx());

// 2) custom configuration
app.use(elysiaJhx({
    middleware: [
        (ctx) => console.log('Request:', ctx.request.method, new URL(ctx.request.url).pathname),
        (ctx) => {
            if (!ctx.request.headers.get('x-header-example-1')) {
                return 'Blocked by middleware';
            }
            if (!ctx.request.headers.get('x-header-example-2')) {
                ctx.set.status = 403;
                return 'Blocked by middleware';
            }
        },
    ],
    notFoundHandler: (ctx) => {
        ctx.set.status = 404;
        return 'Custom 404 Not Found';
    },
    prefix: '/_custom_jhx',
    render: (payload, ctx) => {
        ctx.set.headers['content-type'] = 'text/html; charset=utf-8';
        return payload;
    },
    trailingSlash: 'no-slash',
    errorHandler: (err, ctx) => {
        ctx.set.status = 500;
        ctx.set.headers['content-type'] = 'application/json';
        return { error: 'custom', message: String(err?.message ?? err) };
    },
}));

// 4) Use generated attributes in your normal routes
app.get('/', (ctx) => {
    const attrs = app.jhx({
        target: "#msg",
        handler: () => <div id="msg">Hello from jhx + Elysia</div>,
    });
    
    return (
        <html>
            <body>
                <button {...attrs}>Click me</button>
                <div id="msg"/>
            </body>
        </html>
    );
});

// 5) Inline usage works too
app.get('/inline', (ctx) => {
    return (
        <html>
            <body>
                <button
                    {...app.jhx({
                        target: "#msg",
                        handler: () => <div id="msg">Hello from jhx + Elysia (inline)</div>,
                    })}
                >
                    Click Me (inline)
                </button>
                <div id="msg"/>
            </body>
        </html>
    );
});
```

- Using the `createJhx` function (alternative):

```typescript jsx
import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html'
import { createJhx } from '@jhxdev/elysia';
import { renderToStaticMarkup } from "react-dom/server";

const app = new Elysia().use(html()); // The `html` plugin is not required for the `jhx` adapter, but is useful for Elysia-native JSX rendering

// 1) default configuration
const { jhx, JhxComponent } = createJhx(app);

// 2) custom configuration
const { jhx, JhxComponent } = createJhx(app, {
    middleware: [
        (ctx) => console.log('Request:', ctx.request.method, new URL(ctx.request.url).pathname),
        (ctx) => {
            if (!ctx.request.headers.get('x-header-example-1')) {
                return 'Blocked by middleware';
            }
            if (!ctx.request.headers.get('x-header-example-2')) {
                ctx.set.status = 403;
                return 'Blocked by middleware';
            }
        },
    ],
    notFoundHandler: (ctx) => {
        ctx.set.status = 404;
        return 'Custom 404 Not Found';
    },
    prefix: '/_custom_jhx',
    render: (payload, ctx) => {
        ctx.set.headers['content-type'] = 'text/html; charset=utf-8';
        return payload;
    },
    trailingSlash: 'no-slash',
    errorHandler: (err, ctx) => {
        ctx.set.status = 500;
        ctx.set.headers['content-type'] = 'application/json';
        return { error: 'custom', message: String(err?.message ?? err) };
    },
});

// 3) multiple instances (different prefixes must be used if using multiple instances)
const { jhx: jhx1, JhxComponent: JhxComponent1 } = createJhx(app, {
    prefix: '/_jhx1',
});

const { jhx: jhx2, JhxComponent: JhxComponent2 } = createJhx(app, {
    prefix: '/_jhx2',
});

// 4) Use generated attributes in your normal routes
app.get('/', () => {
    const attrs = jhx({
        target: "#msg",
        handler: () => <div id="msg">Hello from jhx + Elysia</div>,
    });
    
    return (
        <html>
            <body>
                <button {...attrs}>Click me</button>
                <div id="msg"/>
            </body>
        </html>
    );
});

// 5) Inline usage works too
app.get('/inline', () => {
    return (
        <html>
            <body>
                <button
                    {...jhx({
                        target: "#msg",
                        handler: () => <div id="msg">Hello from jhx + Elysia (inline)</div>,
                    })}
                >
                    Click Me (inline)
                </button>
                <div id="msg"/>
            </body>
        </html>
    );
});

// 6) `JhxComponent` usage
app.get('/component', () => {
    return (
        <html>
            <body>
                <JhxComponent
                    as="button"
                    target="#msg"
                    handler={() => <div id="msg">Hi</div>}
                    jhxConfig={{ logger: console }}
                    // other props as needed
                >
                    Component
                </JhxComponent>
                <div id="msg"/>
            </body>
        </html>
    );
});
```

#### 6.8.5. Tests

Tests are located in the `tests` directory and cover initialization, middleware handling, error handling, not found handling, render handling, route handling, routing, and `stringify` configuration (See [Section 6.4](#64-adapter-tests) for full test list).

### 6.9. `@jhxdev/express` - Adapter Package for Express framework

> Location: `packages/express`

Exports adapter functions, utilities, and types for the Express framework, enabling seamless integration of `jhx` with Express applications. Required dependency on the `@jhxdev/server` package, but it will not be listed in the `package.json` (accesses source directly via tsconfig aliasing and Rollup aliasing).

Contains the same utilities from the [Adapter Utilities](#64-adapter-tests) section when using `createJhx` function. See the [5.3. Generic Types](#53-generic-types) section for generic types and descriptions.

#### 6.9.1. Export Surface (from `src/index.ts`)

- `src/types.ts`: Express-specific types extending the generic types from `@jhxdev/server` (handler signatures, route shapes, config types, registration callback, etc.).
- `src/lib/base.ts`: Base primitives and types for Express adapter to directly export in the package.
- `src/lib/create-jhx.ts`: Exports a `createJhx` function factory that wraps `createServerJhx` from `@jhxdev/server`, providing Express-specific defaults, normalizing/validating endpoints, wiring middleware/error/not‑found, and returning the curried jhx, JhxComponent, and registration utilities for Express bindings.
- `src/lib/create-jhx-component.ts`: Exports a `createJhxComponent` function factory that wraps `createJhxComponent` from `@jhxdev/server`, returning a React FC bound to the curried jhx and config, mapping jhx output to JSX attributes.
- `src/lib/default-config.ts`: Exports a `defaultConfig` object for default Express adapter config (content type, debug flag, prefix, render mode/flags, trailing slash policy, routes, middleware) plus core `jhx` and `@jhxdev/server` defaults.

#### 6.9.2. Internal Helpers

- `src/helpers/is-response-handled.ts`: Exports an `isResponseHandled` function to check if the Express response has already been sent (via `res.headersSent` and other operations).
- `src/helpers/send-payload.ts`: Exports a `sendPayload` function to send the payload via the Express response, setting the content type and handling different payload types (string, object, Response, etc.).

#### 6.9.3. Configuration

The `CreateJhxConfig` type extends the `ServerCreateJhxConfig` type from `@jhxdev/server` and uses the default `undefined` for the `TInstanceOptions` generic.

#### 6.9.4. Usage Examples

- Using the `createJhx` function (recommended):

```typescript jsx
import express from 'express';
import { createJhx } from '@jhxdev/express';
import { renderToStaticMarkup } from "react-dom/server";

const app = express();

// 1) default configuration
const { jhx, JhxComponent } = createJhx(app);

// 2) custom configuration
const { jhx, JhxComponent } = createJhx(app, {
    middleware: [
        (req, _res) => console.log('Request:', req.method, req.url),
        (req, res) => {
            if (!req.headers['x-header-example-1']) {
                res.send('Blocked by middleware');
            }
            if (!req.headers['x-header-example-2']) {
                res.status(403).send('Blocked by middleware');
            }
        },
    ],
    notFoundHandler: (_req, res) => { res.status(404).send('Custom 404 Not Found') },
    prefix: '/_custom_jhx',
    render: (payload, _req, res) => { res.send(payload) },
    trailingSlash: 'no-slash',
    errorHandler: (err, _req, res) => { res.status(500).type('application/json').send({ error: 'custom', message: String(err?.message || err) }) },
});

// 3) multiple instances (different prefixes must be used if using multiple instances)
const { jhx: jhx1, JhxComponent: JhxComponent1 } = createJhx(app, {
    prefix: '/_jhx1',
});

const { jhx: jhx2, JhxComponent: JhxComponent2 } = createJhx(app, {
    prefix: '/_jhx2',
});

// 4) Use generated attributes in your normal routes
app.get('/', (_req, res) => {
    const attrs = jhx({
        target: "#msg",
        handler: () => <div id="msg">Hello from jhx + Express</div>,
    });

    const html = renderToStaticMarkup(
        <html>
            <body>
                <button {...attrs}>Click me</button>
                <div id="msg"/>
            </body>
        </html>,
    );
    res.type('text/html; charset=utf-8').send(html);
});

// 5) Inline usage works too
app.get('/inline', (_req, res) => {
    const html = renderToStaticMarkup(
        <html>
            <body>
                <button
                    {...jhx({
                        target: "#msg",
                        handler: () => <div id="msg">Hello from jhx + Express (inline)</div>,
                    })}
                >
                    Click Me (inline)
                </button>
                <div id="msg"/>
            </body>
        </html>,
    );
    res.type('text/html; charset=utf-8').send(html);
});

// 6) `JhxComponent` usage
app.get('/component', (_req, res) => {
    const html = renderToStaticMarkup(
        <html>
            <body>
                <JhxComponent
                    as="button"
                    target="#msg"
                    handler={() => <div id="msg">Hi</div>}
                    jhxConfig={{ logger: console }}
                    // other props as needed
                >
                    Component
                </JhxComponent>
                <div id="msg"/>
            </body>
        </html>,
    );
    res.type('text/html; charset=utf-8').send(html);
});
```

#### 6.9.5. Tests

Tests are located in the `tests` directory and cover initialization, middleware handling, error handling, not found handling, render handling, route handling, routing, and `stringify` configuration (See [Section 6.4](#64-adapter-tests) for full test list).

### 6.10. `@jhxdev/fastify` - Adapter Package for Fastify framework

> Location: `packages/fastify`

Exports adapter functions, utilities, and types for the Fastify framework, enabling seamless integration of `jhx` with Fastify applications. Required dependency on the `@jhxdev/server` package, but it will not be listed in the `package.json` (accesses source directly via tsconfig aliasing and Rollup aliasing).

Contains the same utilities from the [Adapter Utilities](#64-adapter-tests) section when using the `fastifyJhx` plugin and `createJhx` function. See the [5.3. Generic Types](#53-generic-types) section for generic types and descriptions.

#### 6.10.1. Export Surface (from `src/index.ts`)

- `src/types.ts`: Fastify-specific types extending the generic types from `@jhxdev/server` (handler signatures, route shapes, config types, registration callback, instance options generic as `RouteShorthandOptions` from the `fastify` package, etc.).
- `src/lib/base.ts`: Base primitives and types for Fastify adapter to directly export in the package.
- `src/lib/create-jhx.ts`: Exports a `createJhx` function factory that wraps `createServerJhx` from `@jhxdev/server`, providing Fastify-specific defaults, normalizing/validating endpoints, wiring middleware/error/not‑found, and returning the curried jhx, JhxComponent, and registration utilities for Fastify bindings.
- `src/lib/create-jhx-component.ts`: Exports a `createJhxComponent` function factory that wraps `createJhxComponent` from `@jhxdev/server`, returning a React FC bound to the curried jhx and config, mapping jhx output to JSX attributes.
- `src/lib/default-config.ts`: Exports a `defaultConfig` object for default Fastify adapter config (content type, debug flag, prefix, render mode/flags, trailing slash policy, routes, middleware) plus core `jhx` and `@jhxdev/server` defaults.
- `src/lib/plugin.ts`: Exports a `fastifyJhx` function to register the `jhx` adapter to decorate a Fastify instance.

#### 6.10.2. Internal Helpers

- `src/helpers/is-response-handled.ts`: Exports an `isResponseHandled` function to check if the Fastify response has already been sent (via `reply.sent` and other operations).
- `src/helpers/send-payload.ts`: Exports a `sendPayload` function to send the payload via the Fastify response, setting the content type and handling different payload types (string, object, Response, etc.).

#### 6.10.3. Configuration

The `CreateJhxConfig` type extends the `ServerCreateJhxConfig` type from `@jhxdev/server` with the `TInstanceOptions` generic implemented as `RouteShorthandOptions` from the `fastify` package.

#### 6.10.4. Usage Examples

- Using the `fastifyJhx` plugin (recommended):

```typescript jsx
import Fastify from 'fastify';
import { fastifyJhx } from '@jhxdev/fastify';
import { renderToStaticMarkup } from "react-dom/server";

const app = Fastify();

// 1) default configuration
app.register(fastifyJhx);

// 2) custom configuration
app.register(fastifyJhx, {
    logger: app.log,
    middleware: [
        (req, _reply) => console.log('Request:', req.method, req.url),
        (req, reply) => {
            if (!req.headers['x-header-example-1']) {
                return 'Blocked by middleware';
            }
            if (!req.headers['x-header-example-2']) {
                return reply.code(403).send('Blocked by middleware');
            }
        },
    ],
    notFoundHandler: (_req, reply) => reply.code(404).send('Custom 404 Not Found'),
    prefix: '/_custom_jhx',
    render: (payload, _req, reply) => reply.send(payload),
    trailingSlash: 'no-slash',
    errorHandler: (err, _req, reply) => reply.code(500).type('application/json').send({ error: 'custom', message: String(err?.message || err) }),
});

// 4) Use generated attributes in your normal routes
app.get('/', (_, reply) => {
    const attrs = app.jhx({
        target: "#msg",
        handler: () => <div id="msg">Hello from jhx + Fastify</div>,
    });

    const html = renderToStaticMarkup(
        <html>
            <body>
                <button {...attrs}>Click me</button>
                <div id="msg"/>
            </body>
        </html>,
    );

    reply.type('text/html; charset=utf-8').send(html);
});

// 5) Inline usage works too
app.get('/inline', (_, reply) => {
    const html = renderToStaticMarkup(
        <html>
            <body>
                <button
                    {...app.jhx({
                        target: "#msg",
                        handler: () => <div id="msg">Hello from jhx + Fastify (inline)</div>,
                    })}
                >
                    Click Me (inline)
                </button>
                <div id="msg"/>
            </body>
        </html>,
    );
    
    return reply.type('text/html; charset=utf-8').send(html);
});
```

- Using the `createJhx` function (alternative):

```typescript jsx
import Fastify from 'fastify';
import { createJhx } from '@jhxdev/fastify';
import { renderToStaticMarkup } from "react-dom/server";

const app = Fastify();

// 1) default configuration
const { jhx, JhxComponent } = createJhx(app);

// 2) custom configuration
const { jhx, JhxComponent } = createJhx(app, {
    logger: app.log,
    middleware: [
        (req, _reply) => console.log('Request:', req.method, req.url),
        (req, reply) => {
            if (!req.headers['x-header-example-1']) {
                return 'Blocked by middleware';
            }
            if (!req.headers['x-header-example-2']) {
                return reply.code(403).send('Blocked by middleware');
            }
        },
    ],
    notFoundHandler: (_req, reply) => reply.code(404).send('Custom 404 Not Found'),
    prefix: '/_custom_jhx',
    render: (payload, _req, reply) => reply.send(payload),
    trailingSlash: 'no-slash',
    errorHandler: (err, _req, reply) => reply.code(500).type('application/json').send({ error: 'custom', message: String(err?.message || err) }),
});

// 3) multiple instances (different prefixes must be used if using multiple instances)
const { jhx: jhx1, JhxComponent: JhxComponent1 } = createJhx(app, {
    prefix: '/_jhx1',
});

const { jhx: jhx2, JhxComponent: JhxComponent2 } = createJhx(app, {
    prefix: '/_jhx2',
});

// 4) Use generated attributes in your normal routes
app.get('/', (_, reply) => {
    const attrs = jhx({
        target: "#msg",
        handler: () => <div id="msg">Hello from jhx + Fastify</div>,
    });

    const html = renderToStaticMarkup(
        <html>
            <body>
                <button {...attrs}>Click me</button>
                <div id="msg"/>
            </body>
        </html>,
    );
    return reply.type('text/html; charset=utf-8').send(html);
});

// 5) Inline usage works too
app.get('/inline', (_, reply) => {
    const html = renderToStaticMarkup(
        <html>
            <body>
                <button
                    {...jhx({
                        target: "#msg",
                        handler: () => <div id="msg">Hello from jhx + Fastify (inline)</div>,
                    })}
                >
                    Click Me (inline)
                </button>
                <div id="msg"/>
            </body>
        </html>,
    );
    return reply.type('text/html; charset=utf-8').send(html);
});

// 6) `JhxComponent` usage
app.get('/component', (_res, reply) => {
    const html = renderToStaticMarkup(
        <html>
            <body>
                <JhxComponent
                    as="button"
                    target="#msg"
                    handler={() => <div id="msg">Hi</div>}
                    jhxConfig={{ logger: console }}
                    // other props as needed
                >
                    Component
                </JhxComponent>
                <div id="msg"/>
            </body>
        </html>,
    );
    return reply.type('text/html; charset=utf-8').send(html);
});
```

#### 6.10.5. Tests

Tests are located in the `tests` directory and cover initialization, middleware handling, error handling, not found handling, render handling, route handling, routing, and `stringify` configuration (See [Section 6.4](#64-adapter-tests) for full test list).

### 6.11. `@jhxdev/hono` - Adapter Package for Hono framework
> Location: `packages/hono`

Exports adapter functions, utilities, and types for the Hono framework, enabling seamless integration of `jhx` with Hono applications. Required dependency on the `@jhxdev/server` package, but it will not be listed in the `package.json` (accesses source directly via tsconfig aliasing and Rollup aliasing).

Contains the same utilities from the [Adapter Utilities](#64-adapter-tests) section when using the `createJhx` function. See the [5.3. Generic Types](#53-generic-types) section for generic types and descriptions.

#### 6.11.1. Export Surface (from `src/index.ts`)

- `src/types.ts`: Hono-specific types extending the generic types from `@jhxdev/server` (handler signatures, route shapes, config types, registration callback, etc.).
- `src/lib/base.ts`: Base primitives and types for Hono adapter to directly export in the package.
- `src/lib/create-jhx.ts`: Exports a `createJhx` function factory that wraps `createServerJhx` from `@jhxdev/server`, providing Hono-specific defaults, normalizing/validating endpoints, wiring middleware/error/not‑found, and returning the curried jhx, JhxComponent, and registration utilities for Hono bindings.
- `src/lib/create-jhx-component.ts`: Exports a `createJhxComponent` function factory that wraps `createJhxComponent` from `@jhxdev/server`, returning a React FC bound to the curried jhx and config, mapping jhx output to JSX attributes.
- `src/lib/default-config.ts`: Exports a `defaultConfig` object for default Hono adapter config (content type, debug flag, prefix, render mode/flags, trailing slash policy, routes, middleware) plus core `jhx` and `@jhxdev/server` defaults.

#### 6.11.2. Internal Helpers

- `src/helpers/is-response-handled.ts`: Exports an `isResponseHandled` function to check if the Hono response has already been sent (via `c.finalized` and other operations).
- `src/helpers/send-payload.ts`: Exports a `sendPayload` function to send the payload via the Hono response, setting the content type and handling different payload types (string, object, Response, etc.).

#### 6.11.3. Configuration

The `CreateJhxConfig` type extends the `ServerCreateJhxConfig` type from `@jhxdev/server` and uses the default `undefined` for the `TInstanceOptions` generic.

#### 6.11.4. Usage Examples

- Using the `createJhx` function (recommended):

```typescript jsx
import Hono from 'hono';
import { createJhx } from '@jhxdev/hono';
import { renderToStaticMarkup } from "react-dom/server";

const app = new Hono();

// 1) default configuration
const { jhx, JhxComponent } = createJhx(app);

// 2) custom configuration
const { jhx, JhxComponent } = createJhx(app, {
    middleware: [
        (c) => console.log('Request:', c.req.method, c.req.path),
        (c) => {
            if (!c.req.header('x-header-example-1')) {
                return c.text('Blocked by middleware');
            }
            if (!c.req.header('x-header-example-2')) {
                return c.text('Blocked by middleware', 403);
            }
        },
    ],
    notFoundHandler: (c) => c.text('Custom 404 Not Found', 404),
    prefix: '/_custom_jhx',
    render: (payload, c) => c.html(payload),
    trailingSlash: 'no-slash',
    errorHandler: (err, c) => c.json({ error: 'custom', message: String(err?.message ?? err) }, 500),
});

// 3) multiple instances (different prefixes must be used if using multiple instances)
const { jhx: jhx1, JhxComponent: JhxComponent1 } = createJhx(app, {
    prefix: '/_jhx1',
});

const { jhx: jhx2, JhxComponent: JhxComponent2 } = createJhx(app, {
    prefix: '/_jhx2',
});

// 4) Use generated attributes in your normal routes
app.get('/', (c) => {
    const attrs = jhx({
        target: "#msg",
        handler: () => <div id="msg">Hello from jhx + Hono</div>,
    });

    return c.html(
        <html>
            <body>
                <button {...attrs}>Click me</button>
                <div id="msg"/>
            </body>
        </html>
    );
});

// 5) Inline usage works too
app.get('/inline', (c) => {
    return c.html(
        <html>
            <body>
                <button
                    {...jhx({
                        target: "#msg",
                        handler: () => <div id="msg">Hello from jhx + Hono (inline)</div>,
                    })}
                >
                    Click Me (inline)
                </button>
                <div id="msg"/>
            </body>
        </html>
    );
});

// 6) `JhxComponent` usage
app.get('/component', (c) => {
    return c.html(
        <html>
            <body>
                <JhxComponent
                    as="button"
                    target="#msg"
                    handler={() => <div id="msg">Hi</div>}
                    jhxConfig={{ logger: console }}
                    // other props as needed
                >
                    Component
                </JhxComponent>
                <div id="msg"/>
            </body>
        </html>
    );
});
```

#### 6.11.5. Tests

Tests are located in the `tests` directory and cover initialization, middleware handling, error handling, not found handling, render handling, route handling, routing, and `stringify` configuration (See [Section 6.4](#64-adapter-tests) for full test list).

---

## 7. Internal Packages (`@repo/*`)

These packages are located in the `configs` directory and provide shared configurations for esbuild, ESLint, Prettier, and Rollup. They enable all packages in the monorepo to share a consistent and extensible build, linting, and formatting process.

### 7.1. `@repo/esbuild-config` - Shared esbuild Configuration
> Location: `configs/esbuild-config`

Exports the shared esbuild build logic and configuration, enabling all packages to share a consistent and extensible build process for ESM and CJS bundled outputs and type declarations.

#### 7.1.1. Export Surface

- `build.js` as `build`: Exports an async function (`createBuild(distDir: string, esBuildConfig?: import('esbuild').BuildOptions): Promise<void>`) that runs esbuild and creates bundles for both CJS (`.cjs`) and ESM (`.js`) formats, handling output directories and warnings.
- `config.js` as `config`: Exports an esbuild configuration object (`config: import('esbuild').BuildOptions`) with defaults for TypeScript, strictness, React, and Node.js projects.

#### 7.1.2. Usage Examples

- In a package's `esbuild.config.js` file:
  - Note: The base esbuild config files must use the `.js` extension, instead of the `.mjs` extension, to be executable by Bun.

```javascript
import path from 'path';
import { config } from '@repo/esbuild-config/config';
import { createBuild } from '@repo/esbuild-config/build';

(async () => await createBuild(path.join(process.cwd(), 'dist'), config))();
```

```javascript
import path from 'path';
import { config } from '@repo/esbuild-config/config';
import { createBuild } from '@repo/esbuild-config/build';

/** @type {import('esbuild').BuildOptions} */
const esbuildConfig = {
    ...config,
    external: [
        ...config.external,
        // add custom external packages as needed
    ],
    // add other custom overrides as needed
};

(async () => await createBuild(path.join(process.cwd(), 'dist'), esbuildConfig))();
```

- Build the package bundles with one of the commands:

```bash
# create a package bundle using pnpm (bundles only)
pnpm run build:lib

# create a package bundle and types using pnpm (bundles and types)
pnpm run build

# create a package bundle and types using Turborepo
turbo run build --filter=example-package...

# create all bundles and types using Turborepo
turbo run build
```

### 7.2. `@repo/eslint-config` - Shared ESLint Configuration
> Location: `configs/eslint-config`

Exports the shared ESLint configuration, enabling all packages to share a consistent and extensible linting process.

#### 7.2.1. Export Surface

- `base.js` as `base`: Exports the base ESLint configuration array (`config: import("eslint").Linter.Config[]`) for general JavaScript/TypeScript projects, including Prettier, TypeScript, TurboRepo, and OnlyWarn plugins, with ignores and overrides for `.ts`, `.tsx`, `.js`, and `.jsx` files.
- `next.js` as `next-js`: Exports an ESLint configuration array (`nextJsConfig: import("eslint").Linter.Config[]`) extending the base config with Next.js, React, and React Hooks plugin rules, plus Next.js-specific and core web vitals rules.
- `react.js` as `react`: Exports an ESLint configuration array (`reactConfig: import("eslint").Linter.Config[]`) extending the base config with React and React Hooks plugin rules, browser and service worker globals, and JSX-specific settings.

#### 7.2.2. Usage Examples

- In a package's `eslint.config.js` file:

```javascript
import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config[]} */
export default config;
```

```javascript
import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config[]} */
export default [
    ...config,
    // add custom overrides as needed
];
```

- Lint the package with one of the commands:

```bash
# lint a package using pnpm
pnpm run lint

# lint a package using Turborepo
turbo run lint --filter=example-package...

# lint all packages using Turborepo
turbo run lint
```

### 7.3. `@repo/prettier-config` - Shared Prettier Configuration
> Location: `configs/prettier-config`

Exports the shared Prettier configuration, enabling all packages to share a consistent and extensible formatting process.

#### 7.3.1. Export Surface

- `base.js` as `base`: Exports the shared Prettier configuration object (`config: import("prettier").Config`) with rules for consistent formatting, including settings for arrow parentheses, tab width, trailing commas, single quotes, and plugins for Tailwind CSS and import sorting.

#### 7.3.2. Usage Examples

- In a package's `prettier.config.js` file:

```javascript
import { config } from '@repo/prettier-config/base';

/** @type { import("prettier").Config } */
export default config;
```

```javascript
import { config } from '@repo/prettier-config/base';

/** @type { import("prettier").Config } */
export default {
    ...config,
    // add custom overrides as needed
};
```

- Format the package with one of the commands:

```bash
# format a package using pnpm
pnpm run format

# format a package using Turborepo
turbo run format --filter=example-package...

# format all packages using Turborepo
turbo run format
```

### 7.4. `@repo/rollup-config` - Shared Rollup Configuration
> Location: `configs/rollup-config`

Exports the shared Rollup configuration, enabling all packages to share a consistent and extensible type generation process. Implements the `rollup-plugin-dts` plugin for generating declaration files, with TypeScript compiler settings, directory exclusions, and output behavior options.

#### 7.4.1. Export Surface

- `base.js` as `base`: Exports the shared Rollup configuration object (`config: import("rollup").RollupOptions`) for bundling TypeScript declaration files (`.d.ts`) with `node:*` for external dependencies and with custom input/output paths.

#### 7.4.2. Usage Examples

- In a package's `rollup.config.js` file:

```javascript
import { config } from '@repo/rollup-config/base';

/** @type { import("rollup").RollupOptions } */
export default config;
```

```javascript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '@repo/rollup-config/base';
import alias from '@rollup/plugin-alias';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type { import("rollup").RollupOptions } */
export default {
    ...config,
    external: [
        ...config.external,
        // add custom external packages as needed
    ],
    plugins: [
        ...config.plugins,
        alias({
            entries: [
                {
                    find: '@jhxdev/server',
                    replacement: path.resolve(__dirname, '../server/src'),
                },
            ],
        }),
        // add other custom plugins as needed
    ],
    // add other custom overrides as needed
};
```

- Build the package types with one of the commands:

```bash
# create package types using pnpm (types only)
pnpm run build:types

# create package types and bundle using pnpm (types and bundles)
pnpm run build

# create package types and bundle using Turborepo
turbo run build --filter=example-package...

# create all monorepo package types using Turborepo
turbo run build
```

### 7.5. `@repo/typescript-config` - Shared TypeScript Configuration
> Location: `configs/typescript-config`

Exports the shared TypeScript configuration, enabling all packages to share a consistent, strict, extensible tsconfig bases for React, Next.js, and general TypeScript projects.

#### 7.5.1. Export Surface

- `base.json` as `base.json`: Base configuration with strict type checking, ES2022 target, ESNext modules, bundler resolution, and DOM types. Includes settings for declaration maps, isolated modules, JSON imports, and comprehensive error checking flags.
- `nextjs.json` as `nextjs.json`: Extends base config with Next.js-specific settings including the Next.js TypeScript plugin, ESNext modules with bundler resolution, and preserved JSX compilation.
- `react.json` as `react.json`: Minimal React-focused extension of base config that preserves JSX compilation while inheriting all other strict TypeScript settings.

#### 7.5.2. Usage Examples

- In a package's `tsconfig.json` file:

```json
{
  "extends": "@repo/typescript-config/base.json",
    "include": [
      "src/**/*.ts",
      "src/**/*.tsx",
      "tests/**/*.ts",
      "tests/**/*.tsx"
    ]
}
```

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
  "baseUrl": "./",
    "paths": {
      "@jhxdev/server": ["../server/src/index.ts"],
      "@jhxdev/server/*": ["../server/src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "../server/src/**/*.ts",
    "../server/src/**/*.tsx"
  ]
}
```

- Check the package types with one of the commands:

```bash
# check package types using pnpm
pnpm run check-types

# check package types using Turborepo
turbo run check-types --filter=example-package...

# check all monorepo package types using Turborepo
turbo run check-types
```

---

## 8. Tooling & Build System

### 8.1. Turborepo (`turbo.json`)

- Available Tasks: `build`, `lint`, `check-types`, `dev`, `test`, `test:watch`.
- `dependsOn: ["^task"]` ensures bottom-up build (e.g., libraries build before apps).
- Caching: build outputs include `.next/**` (excluding cache) and `dist/**`.
- `dev` tasks marked non-cached + persistent.

### 8.2. Package Manager

- `pnpm` (workspace ranges: `workspace:*` keep local linkage)

### 8.3. Compilers & Bundlers

- esbuild: fast JS build for libraries.
- Rollup: d.ts bundling (via rollup + plugin-dts).

### 8.4. Testing

- `bun test` used across library packages via Bun's built-in test runner.
- If adding tests, mirror adapter pattern for consistency.

### 8.5. Linting / Formatting

- ESLint (central config) + Prettier (with Tailwind + import sort plugins).
- Scripts enforce zero warnings (`--max-warnings 0`).

### 8.6. TypeScript

- Centralized base configs in `@repo/typescript-config`.
- Libraries compile with `--jsx preserve` when needed (ensures React 18/19 behavior remains correct).

---

## 9. Coding Conventions & Style

- TypeScript-first (no JS sources for shared libs).
- Minimal comments unless clarifying non-obvious logic.
- Consistent naming (e.g., `jhx`, `Jhx`, `JhxConfig`, `JhxProps`, etc.).
- Follow the recommended framework-specific patterns, workflows, and functions, when using server frameworks or implementing adapters.
- Follow the package-specific Prettier configuration formatting rules.

---

## 10. Version & Environment Notes

- Node engine: `>=18`
- React: Primarily `19.1.x` in apps; core allows `^18 || ^19` for broad compatibility
- HTMX: `^2.0.7` (via `htmx.org` dependency)
- Bun: Used for tests (e.g., `bun test`) + esbuild script execution (e.g., `bun esbuild.config.js`)

---

## 11. Safe Refactoring Guidelines

- Add unit tests before changing transformation logic in `convert-*` helpers.
- Keep overload signatures for `jhx` aligned with implementation.
- If adding config flags, extend `default-config.ts` and update all adapters if they rely on defaults.

---

## 12. Quick Glossary

- htmx/HTMX: Library enabling AJAX, WebSocket, SSE via HTML attributes
- `hx-*` attributes: HTMX directives (e.g., `hx-get`, `hx-post`, `hx-swap`)
- Adapter: Package integrating `jhx` with a specific server framework (e.g., Express, Fastify, Elysia, Hono).

---

## 13. Maintenance Notes

- Keep the `llms.md` and `llms-mini.md` files updated when: new adapter added, core API changes, build pipeline changes, or the documentation needs to be changed.
- Treat the `llms.md` and `llms-mini.md` files as the sources of truth for automated reasoning context.

---

## 14. Release & Publishing Flow

Publishing strategy uses Changesets for versioning and release orchestration of publishable packages (`jhx` and framework adapters). Private/internal packages (e.g., `@repo/*`, `@jhxdev/server`) remain unpublished.

Root script:

```
pnpm run publish-packages
```

Expands to:

1. `turbo run lint check-types format build test` – Ensures all build artifacts, lint rules, and tests pass.
2. `pnpm changesets version` – Applies collected changesets, bumps versions, updates changelogs.
3. `pnpm changesets publish` – Publishes updated packages to the registry.

LLM Guidance:

- When adding a new publishable package: include a `README.md`, proper `exports` map, semantic version in `package.json`, and add Changeset files for modifications.
- Do NOT publish if build or tests fail—fix first.
- Keep adapters' peer dependency ranges broad but safe (React `^18 || ^19`).
- Ensure consistency of `main`, `module`, `types`, and conditional export entries.

## 15. Versioning

This project uses a **Leading Zero Major Versioning** strategy (`0.MINOR.{MINOR+PATCH}`) for all publishable packages:

- **First segment** (`0`): Always zero (e.g., `0.x.x`).
- **Second segment** ("Major"): Incremented for new features or breaking changes (e.g., `0.1.0` → `0.2.0`).
- **Third segment** ("Minor/Patch"): Incremented for bug fixes or minor improvements. Patch numbers may skip (e.g., `0.2.0` → `0.2.1` → `0.2.3`).

### 15.1. Versioning Guidelines

- All publishable packages must synchronize their "major" (second segment) releases.
- Patch releases (third segment) do not need to be synchronized across packages.

### 15.2. Versioning Examples

```text
0.3.2   // Third "major" release, second patch
0.3.5   // Third "major" release, fifth patch
0.4.0   // Fourth "major" release, initial patch
```
---

## 16. Package Matrix (At a Glance)

| Package Name            | Path                      | Category  | Publishable  | External Name / Scope | Key Depends On             | Notes                                           |
|-------------------------|---------------------------|-----------|--------------|-----------------------|----------------------------|-------------------------------------------------|
| jhx                     | packages/jhx              | core      | Yes          | `jhx`                 | react, react-dom, htmx.org | Core attribute synthesis engine                 |
| @jhxdev/fastify         | packages/fastify          | adapter   | Yes          | `@jhxdev/fastify`     | jhx, fastify-plugin        | Fastify integration layer                       |
| @jhxdev/express         | packages/express          | adapter   | Yes          | `@jhxdev/express`     | jhx, express               | Express integration layer                       |
| @jhxdev/hono            | packages/hono             | adapter   | Yes          | `@jhxdev/hono`        | jhx, hono                  | Hono integration layer                          |
| @jhxdev/elysia          | packages/elysia           | adapter   | Yes          | `@jhxdev/elysia`      | jhx, elysia                | Elysia integration layer                        |
| @jhxdev/server          | packages/server           | internal  | No (private) | n/a                   | jhx                        | Generic server layer for framework integrations |
| @repo/eslint-config     | configs/eslint-config     | tooling   | No (private) | n/a                   | eslint                     | ESLint base rules                               |
| @repo/typescript-config | configs/typescript-config | tooling   | No (private) | n/a                   | typescript                 | Shared tsconfig bases                           |
| @repo/rollup-config     | configs/rollup-config     | tooling   | No (private) | n/a                   | rollup                     | Rollup DTS bundling base                        |
| @repo/esbuild-config    | configs/esbuild-config    | tooling   | No (private) | n/a                   | esbuild                    | Esbuild base and helpers                        |
| @repo/prettier-config   | configs/prettier-config   | tooling   | No (private) | n/a                   | prettier                   | Prettier formatting base                        |

Legend:

- Publishable = intended for npm registry distribution.
- Category differentiates runtime core, framework adapters, tooling, apps, and internal utilities.
- Key Depends On excludes ubiquitous dev-only tooling (TypeScript, ESLint, etc.).

Maintenance Tip: When adding a new package, update this matrix to keep automated reasoning accurate.

---

End of LLM context document.
