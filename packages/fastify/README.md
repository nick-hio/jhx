<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nick-hio/jhx/main/assets/jhx-logo-light.svg">
    <img src="https://raw.githubusercontent.com/nick-hio/jhx/main/assets/jhx-logo-dark.svg" height="90" alt="Logo for jhx">
  </picture>
</p>

<div align="center">
  Type-Safe HTMX.
</div>

<div align="center">
  <a target="_blank" href="https://github.com/nick-hio/jhx">GitHub</a> •
  <a target="_blank" href="https://github.com/nick-hio/jhx">Documentation</a> •
  <a target="_blank" href="https://github.com/nick-hio/jhx/issues/new">Report an Issue</a>
</div>

# @jhxdev/fastify

- **Defines HTMX handlers directly within elements.**  
  Creates server endpoints for HTMX interactions without manually configuring routes.
- **Type-safe HTMX helper for React/JSX, HTML, SSR/edge, and modern web frameworks.**  
  Converts strongly typed props into HTMX `hx-*` attributes with flexible output options for JSX and HTML templating.
- **Comprehensive HTMX attribute and event mapping.**  
  Supports all HTMX features and events, including swap, target, trigger, headers, request, and event handlers.
- **Easy integration and strong type inference.**  
  Type inference for HTMX patterns and DOM access, works with HTMX libraries and extensions, and supports server and client use cases.

> [!NOTE]
> Don't need server integration? **Check out the core package:** [`jhx`](https://github.com/nick-hio/jhx/tree/main/packages/jhx)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [`createJhx`](#createjhx)
  - [`fastifyJhx`](#fastifyjhx)
- [Examples](#examples)
  - [Reusing Handlers](#reusing-handlers)
  - [Multiple Instances](#multiple-instances)
  - [Custom `render` Handler](#custom-render-handler)
  - [Custom `middleware` Handlers](#custom-middleware-handlers)
  - [Predefined `routes`](#predefined-routes)
  - [DOM Interactions & Type Safety](#dom-interactions--type-safety)

## Installation

Install via your preferred package manager:

```
pnpm install @jhxdev/fastify
npm install @jhxdev/fastify
bun add @jhxdev/fastify
yarn add @jhxdev/fastify
```

Import the package:

```ts
// ESM import
import { fastifyJhx, createJhx } from '@jhxdev/fastify';

// CJS import
const { fastifyJhx, createJhx } = require('@jhxdev/fastify');
```

## Quick Start

Register the plugin with Fastify *OR* create a standalone instance:

```jsx
import Fastify from 'fastify';
import { createJhx, fastifyJhx } from '@jhxdev/fastify';

const fastify = Fastify();

await fastify.register(fastifyJhx); // using the plugin
// OR
const { jhx, JhxComponent } = createJhx(fastify); // using the `createJhx` function
```

Generate HTMX attributes for JSX props:

```jsx
const attrs = fastify.jhx({
    get: '/api',
    swap: 'innerHTML',
});

const button = (<button {...attrs}>Load Data</button>);
// <button hx-get="/_jhx/api" hx-swap="innerHTML">Load Data</button>
```

Generate a unique endpoint and HTMX attributes as a string for HTML templating:

```jsx
const attrs = fastify.jhx({
    swap: 'innerHTML',
    method: 'put', // set the method (defaults to 'get')
    // define the handler for the interaction
    handler: () => {
        return `<div>DATA</div>`;
    },
}, { stringify: true }); // set 'stringify' to 'true'

const button = `<button ${attrs}>Load Data</button>`;
// <button hx-put="/_jhx/<UNIQUE_ID>" hx-swap="innerHTML">Load Data</button>
```

Generate a set endpoint and HTMX attributes with the JSX component:

```jsx
const button = (
    <fastify.JhxComponent
        as='button' // set the element tag (defaults to 'div')
        post='/api' // set the route and method
        swap='innerHTML'
        // define the handler for the interaction
        handler={async () => {
            return `<div>${await db.getData()}</div>`;
        }}
    >
        Load Data
    </fastify.JhxComponent>
);
// <button hx-post="/_jhx/api" hx-swap="innerHTML">Load Data</button>
```

## API

> See the [Examples](#examples) section for usage.

Documentation for the `jhx` and `JhxComponent` APIs can be found in the [core package repo](https://github.com/nick-hio/jhx/tree/main/packages/jhx#api).

### `createJhx`

Function which creates instances of `jhx` and `JhxComponent` to bind to a Fastify instance.

```ts
function createJhx<TDomBase, TError, TReturn, TRequest, TReply>(
    fastify: FastifyInstance,
    config?: CreateJhxConfig<TReturn, TError, JhxRenderReturn, TRequest, TReply>,
): {
    jhx: Jhx<TDomBase, TReturn, TRequest, TReply>;
    JhxComponent: JhxComponentType<TDomBase, TReturn, TRequest, TReply>;
};
```

#### Parameters

##### `fastify`

A Fastify instance to bind the `jhx` and `JhxComponent` functionality to.

##### `config`

An optional configuration object of type `CreateJhxConfig` to customize the behavior of `jhx` and `JhxComponent`.

| Property           | Type                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                     |
|--------------------|-----------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `contentType`      | `string \| false`                                   | Specifies the default `Content-Type` header for responses. Defaults to `text/html`.<br>- When `false`, no default header is used.                                                                                                                                                                                                                                                                                               |
| `debug`            | `boolean`                                           | Enables debug mode for logging additional information. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                     |
| `errorHandler`     | `JhxErrorHandler`                                   | Error handler function which is executed when a middleware or route handler throws an error.                                                                                                                                                                                                                                                                                                                                    |
| `middleware`       | `JhxHandler \| Array<JhxHandler>`                   | Middleware handler function(s) to execute before the route handler.                                                                                                                                                                                                                                                                                                                                                             |
| `notFoundHandler`  | `JhxHandler`                                        | Handler function which is executed when a request does not match any route.                                                                                                                                                                                                                                                                                                                                                     |
| `onRegistered`     | `JhxOnRegistered`                                   | Callback function executed when a route is registered.                                                                                                                                                                                                                                                                                                                                                                          |
| `prefix`           | `string`                                            | Prefix to prepend to all routes. Defaults to `/_jhx`.                                                                                                                                                                                                                                                                                                                                                                           |
| `renderError`      | `boolean`                                           | Whether to execute the `render` function with the error handler return value. Defaults to `true`.                                                                                                                                                                                                                                                                                                                               |
| `renderMiddleware` | `boolean`                                           | Whether to execute the `render` function when a middleware handler returns a value. Defaults to `true`.                                                                                                                                                                                                                                                                                                                         |
| `renderNotFound`   | `boolean`                                           | Whether to execute the `render` function with the not-found handler return value. Defaults to `true`.                                                                                                                                                                                                                                                                                                                           |
| `render`           | `'static' \| 'string' \| JhxRenderHandler \| false` | Determines how responses are rendered before being sent. Allows custom `JhxRenderHandler` function. Defaults to `'static'`.<br>- When `'string'`, **JSX payloads are rendered** using the `renderToString` function from React.<br>- When `'static'`, **JSX payloads are rendered** using the `renderToStaticMarkup` function from React.<br>- When `false`, no render function is executed and all payloads are sent directly. |
| `routes`           | `JhxPartialRoute \| Array<JhxPartialRoute>`         | Predefined routes to register with the Fastify instance upon initialization.                                                                                                                                                                                                                                                                                                                                                    |
| `trailingSlash`    | `'slash' \| 'no-slash' \| 'both'`                   | Controls how to handle trailing slashes in routes. Defaults to `'both'`.<br>- When `'slash'`, routes will **only accept** trailing slashes (e.g., `/api/`). <br>- When `'no-slash'`, routes will **not accept** trailing slashes (e.g., `/api`). <br>- When `'both'`, routes will **accept either** (e.g., `/api` or `/api/`).                                                                                                  |
| `instanceOptions`  | `RouteShorthandOptions` (from Fastify)              | Additional route configuration options.                                                                                                                                                                                                                                                                                                                                                                                         |

#### Generics

- `TDom` (extends `object`) - Type for the additional DOM variables (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).
- `TError` (extends `JhxErrorType`) - Type for the error value passed to the error handler.
- `TReturn` (extends `JhxHandlerReturn`) - Type for the return value of the handler functions.
- `TRequest` (extends `FastifyRequest`) - Type for the Fastify request object.
- `TReply` (extends `FastifyReply`) - Type for the Fastify reply object.

#### Returns

The `createJhx` function returns an object containing the following properties:
- `jhx`: An extended `jhx` function which is bound to the provided Fastify instance.
- `JhxComponent`: An extended `JhxComponent` which is bound to the provided Fastify instance.

---

### `fastifyJhx`

Fastify plugin which decorates a Fastify instance with [`jhx`](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhx-1) and [`JhxComponent`](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhxcomponent).

```ts
const fastifyJhx: FastifyPluginCallback<CreateJhxConfig, RawServerDefault, FastifyTypeProviderDefault, FastifyBaseLogger>
```

#### Configuration

Same as the [`config` parameter](#config) for the `createJhx` function.

#### Usage

```tsx
import Fastify from 'fastify';
import { createJhx, fastifyJhx } from '@jhxdev/fastify';
import { renderToString } from "react-dom/server";

const fastify = Fastify();
await fastify.register(fastifyJhx, { /* configuration */ });
fastify.listen({ port: 3000 }, (err) => { /* ... */ });

// using the `jhx` function
fastify.get('/function', (req, reply) => {
    reply.type('text/html').send(`
        <body>
            <button ${fastify.jhx({
                get: '/api',
                swap: 'innerHTML',
            }, { stringify: true })}>
                Load Data
            </button>
        </body>
    `);
});

// using the `JhxComponent`
fastify.get('/component', (req, reply) => {
    reply.type('text/html').send(renderToString(
        <body>
            <fastify.JhxComponent
                as='button'
                get='/api'
                swap='innerHTML'
            >
                Load Data
            </fastify.JhxComponent>
        </body>
    ));
});
```

---

## Examples

- [Default `stringify` Value](#default-stringify-value)
- [Reusing Handlers](#reusing-handlers)
- [Multiple Instances](#multiple-instances)
- [Custom `render` Handler](#custom-render-handler)
- [Custom `middleware` Handlers](#custom-middleware-handlers)
- [Predefined `routes`](#predefined-routes)
- [DOM Interactions & Type Safety](#dom-interactions--type-safety)

> See additional examples in the core [`jhx` repository](https://github.com/nick-hio/jhx/tree/main/packages/jhx):
>
> - [Setting the Request Method](https://github.com/nick-hio/jhx/tree/main/packages/jhx#setting-the-request-method)
> - [`jhx` in JSX (Object Output)](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhx-in-jsx-object-output)
> - [`jhx` in HTML (String Output)](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhx-in-html-string-output)
> - [`JhxComponent` in JSX](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhxcomponent-in-jsx)
> - [HTMX & DOM Events](https://github.com/nick-hio/jhx/tree/main/packages/jhx#htmx--dom-events)
> - [Advanced Props](https://github.com/nick-hio/jhx/tree/main/packages/jhx#advanced-props)

### Default `stringify` Value

When initializing with the `createJhx` function or `fastifyJhx` plugin, you can set a default `config.stringify` value to be used for **all calls** to the `jhx` function.
This can be overridden on a per-call basis.

This can be useful when you **primarily use the string output (e.g., HTML templating)** in your application more often than the object output (e.g., JSX templating).

```tsx
const { jhx, JhxComponent } = createJhx(fastify, {
    stringify: true, // set default 'stringify' to 'true'
});

const SubmitButton = `
    <button ${jhx({
        post: '/submit',
        swap: 'innerHTML',
    })}>
        Submit
    </button>
`;

const CancelButton = `
    <button ${jhx({
        get: '/cancel',
        swap: 'innerHTML',
    })}>
        Cancel
    </button>
`;

// set 'stringify' to 'false' for object output
const RefreshButton = (
    <button {...jhx({
        get: '/refresh',
        swap: 'innerHTML',
    }, { stringify: false })}>
        Refresh
    </button>
);
```

---

### Reusing Handlers

```tsx
import { JhxHandler } from '@jhxdev/fastify';

const handler: JhxHandler = (req, reply) => {
    return `<div>Reusable Handler Response</div>`;
}

fastify.jhx({
    get: '/api/1',
    handler,
});

fastify.jhx({
    post: '/api/2',
    handler,
});

fastify.jhx({
    method: 'get', // using generated endpoint
    handler,
});
```

### Multiple Instances

Multiple instances of `jhx` and `JhxComponent` can be bound to the same Fastify instance.
**Only one plugin can be registered per Fastify instance**, so subsequent instances can be bound using the `createJhx` function.

When invoking `createJhx` more than once, **each call must use a different `config.prefix` value**.

```ts
import Fastify from 'fastify';
import { createJhx, fastifyJhx } from '@jhxdev/fastify';

const fastify = Fastify();

// First instance
const {
    jhx: jhx1,
    JhxComponent: JhxComponent1,
} = createJhx(fastify, { prefix: '/_jhx1' });

// Second instance (via the plugin)
await fastify.register(fastifyJhx); // prefix defaults to '/_jhx'

// Third instance
const {
    jhx: jhx2,
    JhxComponent: JhxComponent2,
} = createJhx(fastify, { prefix: '/_jhx2' });
```

### Custom `render` Handler

The `render` handler processes the return values of **all handlers**, unless it is set to `false`, then the handler return values will be sent directly.

```tsx
import { isValidElement } from "react";
import { renderToString } from "react-dom/server";

createJhx(fastify, {
    render: async (payload, req, reply) => {
        if (isValidElement(payload)) {
            return renderToString(payload);
        }
        if (payload instanceof Blob) {
            reply.header('Content-Type', 'application/octet-stream');
            return Buffer.from(await payload.arrayBuffer())
        }
        return payload;
    },
});
```

### Custom `middleware` Handlers

You can define one or more middleware handlers to run before the route handlers created by the `jhx` function.

Any value other than `void | undefined` returned from a middleware handler will be sent and the **route handler will not be executed**.

```ts
const { jhx, JhxComponent } = createJhx(fastify, {
    prefix: '/api',
    middleware: (req, reply) => {
        console.log(`Request made to: ${req.url}`);
    },
});

const { jhx: authJhx, JhxComponent: AuthJhxComponent } = createJhx(fastify, {
    prefix: '/auth-api',
    middleware: [
        (req) => {
            console.log(`Auth route request made to: ${req.url}`);
        },
        async (req, reply) => {
            const authorized = await checkAuth(req);
            if (!authorized) {
                reply.status(401);
                return `<div>Unauthorized</div>`;
            }
        },
    ],
});
```

### Predefined `routes`

Since the `jhx` function registers routes at runtime, **some routes will not exist until their corresponding `jhx` function is called**.

To ensure routes are available beforehand, define them by doing one (or both) of the following:
1. Set the `config.routes` option when invoking the `createJhx` function or `fastifyJhx` plugin.
2. Invoke the `jhx` or `fastify.jhx` function before starting the server.

```tsx
import Fastify from 'fastify';
import { createJhx } from '@jhxdev/fastify';

const fastify = Fastify();

// 1.
const { jhx } = createJhx(fastify, {
    routes: [
        {
            route: '/latest', // defaults to 'GET' method
            handler: async () => {
                return `<div>${await db.getData()}</div>`;
            },
        },
        {
            route: '/submit',
            method: 'POST',
            handler: (req) => {
                return (
                    <div>
                        Submitted Data: {JSON.stringify(req.body)}
                    </div>
                );
            },
        },
    ],
});

// 2.
jhx({
    get: '/static',
    handler: async () => {
        return `<div>Static Route</div>`;
    },
})

fastify.listen({ port: 3000 }, (err, address) => { /* ... */ });
```

### DOM Interactions & Type Safety

In all event handlers (and some props), you have access to the `document`, `window`, and `htmx` objects in the DOM.
The `TDom` generic allows you to **define additional variables** that are available in the DOM.

> See the core [`jhx` repository](https://github.com/nick-hio/jhx/tree/main/packages/jhx#dom-interactions--type-safety) for more information on using the `TDom` generic.

When using the `createJhx` function, you can specify a default `TDom` type which will be used for **all event handlers and DOM-related props** when invoking the `jhx` function or using `JhxComponent`.
This can be overridden on a per-call basis.

```tsx
type BaseDom = { darkMode?: boolean };
const { jhx, JhxComponent } = createJhx<BaseDom>(fastify);

// the `BaseDom` type is available for `jhx` and `JhxComponent`
jhx({
    vals: ({ darkMode }) => ({
        darkMode: darkMode ?? false,
    }),
});
jhx({
    headers: ({ darkMode }) => ({
        'X-Color-Scheme': darkMode ? 'dark' : 'light',
    }),
});

// overrides the default `BaseDom` type
type SearchPageDom = { searchQuery: string };
jhx<SearchPageDom>({
    vals: ({ searchQuery }) => ({
        query: searchQuery,
    }),
});
```
