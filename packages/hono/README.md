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

# @jhxdev/hono

- **Defines HTMX handlers inline within elements.**  
  Creates server endpoints for HTMX interactions without manually configuring routes.
- **HTMX helper for React/JSX, HTML, and SSR/edge.**  
  Dedicated types with strong inference for HTMX patterns, features, and extensions.
- **Type-safe HTMX attribute and event mapping.**  
  Converts typed props into valid HTMX `hx-*` attributes for templating.
- **Streamlines developer experience for complex HTMX applications.**  
  Simplifies the development of large HTMX applications with advanced interactions.

> [!NOTE]
> Don't need server integration? **Check out the core package:**
>
> - [`jhx`](https://github.com/nick-hio/jhx/tree/main/packages/jhx)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
    - [`createJhx`](#createjhx)
    - [`jhx`](#jhx)
    - [`JhxComponent`](#jhxcomponent)
- [Examples](#examples)
    - [Default `stringify`](#default-stringify)
    - [Reusing Handlers](#reusing-handlers)
    - [Multiple Instances](#multiple-instances)
    - [Custom `render` Handler](#custom-render-handler)
    - [Custom `middleware` Handler(s)](#custom-middleware-handlers)
    - [Predefined `routes`](#predefined-routes)
    - [DOM Interactions & Type Safety](#dom-interactions--type-safety)

## Installation

Install via your preferred package manager:

```
pnpm install @jhxdev/hono
npm install @jhxdev/hono
bun add @jhxdev/hono
yarn add @jhxdev/hono
```

Import the package:

```ts
// ESM import
import { createJhx } from '@jhxdev/hono';

// CJS import
const { createJhx } = require('@jhxdev/hono');
```

## Quick Start

Call the `createJhx` function with your Hono instance:

```jsx
import { Hono } from 'hono';
import { createJhx } from '@jhxdev/hono';

const app = new Hono();
const { jhx, JhxComponent } = createJhx(app);
```

Create HTMX attributes for JSX props:

```jsx
const attrs = jhx({
    get: '/api',
    target: '#container',
});

const Button = () => (<button {...attrs}>Load Data</button>);
// <button hx-get="/_jhx/api" hx-target="#container">Load Data</button>
```

Create HTMX attributes as a string for HTML and with a generated endpoint:

```jsx
const attrs = jhx({
    method: 'put', // set the method (defaults to 'get')
    target: '#container',
    handler: () => {
        return `<div>Response</div>`;
    },
}, { stringify: true }); // set 'stringify' to 'true'

const button = `<button ${attrs}>Load Data</button>`;
// <button hx-put="/_jhx/<UNIQUE_ID>" hx-target="#container">Load Data</button>
```

Create HTMX attributes using the JSX component:

```jsx
const button = (
    <JhxComponent
        as='button' // set the element tag (defaults to 'div')
        post='/api'
        target='#container'
        handler={async () => {
            return `<div>${await db.getData()}</div>`;
        }}
    >
        Load Data
    </JhxComponent>
);
// <button hx-post="/_jhx/api" hx-target="#container">Load Data</button>
```

## API

> See the [Examples](#examples) section for usage.

Documentation for the `jhx` and `JhxComponent` APIs can be found in the [`jhx` repository](https://github.com/nick-hio/jhx/tree/main/packages/jhx#api).

### `createJhx`

Function which creates instances of `jhx` and `JhxComponent` bound to a Hono instance.

```ts
function createJhx<TDomBase, TError, TReturn, TContext>(
    hono: Hono,
    config?: CreateJhxConfig<TReturn, TError, JhxRenderReturn, TContext>,
): {
    jhx: Jhx<TDomBase, TReturn, TContext>;
    JhxComponent: JhxComponentType<TDomBase, TReturn, TContext>;
};
```

#### Parameters

##### `hono`

A Hono instance to bind the `jhx` function and `JhxComponent`.

##### `config` (optional)

Configuration options for controlling the behavior of `jhx` and `JhxComponent`.

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
| `render`           | `JhxRenderHandler \| 'static' \| 'string' \| false` | Determines how responses are rendered before being sent. Allows custom `JhxRenderHandler` function. Defaults to `'string'`.<br>- When `'string'`, **JSX payloads are rendered** using the `renderToString` function from React.<br>- When `'static'`, **JSX payloads are rendered** using the `renderToStaticMarkup` function from React.<br>- When `false`, no render function is executed and all payloads are sent directly. |
| `routes`           | `JhxPartialRoute \| Array<JhxPartialRoute>`         | Predefined routes to register with the Hono instance upon initialization.                                                                                                                                                                                                                                                                                                                                                       |
| `trailingSlash`    | `'slash' \| 'no-slash' \| 'both'`                   | Controls how to handle trailing slashes in routes. Defaults to `'both'`.<br>- When `'slash'`, routes will **only accept** trailing slashes (e.g., `/api/`). <br>- When `'no-slash'`, routes will **not accept** trailing slashes (e.g., `/api`). <br>- When `'both'`, routes will **accept both** (e.g., `/api` or `/api/`).                                                                                                    |

#### Generics

- `TDom` (extends `object`) - Type for the additional DOM variables (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).
- `TError` (extends `JhxErrorType`) - Type for the error value passed to the error handler.
- `TReturn` (extends `JhxHandlerReturn`) - Type for the return value of the handler functions.
- `TContext` (extends `Context` from Hono) - Type for the Hono context object.

#### Returns

The `createJhx` function returns an object containing the following properties:
- `jhx` - An extended `jhx` function which is bound to the Hono instance through the `handler` prop.
- `JhxComponent` - An extended `JhxComponent` which is bound to the Hono instance through the `handler` prop.

### `jhx`

A function that transforms props into an object of HTMX attributes and registers the corresponding route handler.

```ts
function jhx<TDom>(props: JhxDomProps<TDom>, config?: JhxConfig & { stringify: true }): string;
function jhx<TDom>(props: JhxProps<TDom>, config?: JhxConfig & { stringify?: false }): Record<JhxAttribute, string>;
```

#### Parameters

##### `props`

An object containing the HTMX attribute values and the route handler function.

| Property                     | Type                                                                                                       | Description                                   |
|------------------------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `handler`                    | `JhxHandler`                                                                                               | Route handler function for the HTMX endpoint. |
| All props for the base `jhx` | See the [`jhx` repository](https://github.com/nick-hio/jhx/tree/main/packages/jhx#props) for more details. | All other HTMX-related props.                 |

##### `config` (optional)

Configuration options for the function.

| Property    | Type      | Description                                                                                                                                                                                                            |
|-------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `escape`    | `boolean` | Whether to escape the HTML characters in the attribute values. Defaults to `true`.                                                                                                                                     |
| `logger`    | `Logger`  | Logging functions for debug messages, warnings, and errors from jhx. Defaults to `console`.                                                                                                                            |
| `stringify` | `boolean` | Converts the result into a string of HTML attributes. Overrides the default value. Defaults to `false`.<br>- When `true`, returns a string of HTML attributes.<br>- When `false`, returns an object for JSX spreading. |

#### Generics

- `TDom` (extends `object`) - Type for the additional DOM variables (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).

#### Returns

`jhx` will return a `string` when `config.stringify` set to `true`, otherwise, returns a `Record<JhxAttribute, string>`.

#### Utility Functions

Each `jhx` function instance has the following functions to help with managing its routes:

- `addRoute` - Registers a single route. Automatically prepends the `config.prefix` value from initialization.
  ```ts
  jhx.addRoute({ route: string, method: string, handler: JhxHandler }): void;
  ```

- `addRoutes` - Registers multiple routes. Automatically prepends the `config.prefix` value from initialization.
  ```ts
  jhx.addRoutes(Array<{ route: string, method: string, handler: JhxHandler }>): void;
  ```

- `clearRoutes` - Removes all registered routes.
  ```ts
  jhx.clearRoutes(): void;
  ```

- `getRoute` - Returns the configuration for a specific route. Returns `null` when the route doesn't exist.
  ```ts
  jhx.getRoute({ route: string, method: string }): { route: string, method: HttpMethod, handler: JhxHandler } | null;
  ```

- `getRoutes` - Returns an array of all registered routes and their configurations.
  ```ts
  jhx.getRoutes(): Array<{ route: string, method: HttpMethod, handler: JhxHandler }>;
  ```

- `hasRoute` - Checks if a specific route is registered.
  ```ts
  jhx.hasRoute({ route: string, method: string }): boolean;
  ```

- `removeRoute` - Removes a specific route. Returns a `true` when the route was removed, otherwise `false`.
  ```ts
  jhx.removeRoute({ route: string, method: string }): boolean;
  ```

### `JhxComponent`

JSX wrapper element for the `jhx` function bound to the Hono instance.

```ts
function JhxComponent<TDom>(props: PropsWithChildren<JhxComponentProps<TDom>>): JSX.Element
```

#### Props

| Prop                | Type                           | Description                                                                             |
|---------------------|--------------------------------|-----------------------------------------------------------------------------------------|
| `as`                | `keyof JSX.IntrinsicElements`  | Specifies the element tag for the component. Defaults to `div`.                         |
| `jhxConfig`         | `Omit<JhxConfig, 'stringify'>` | Configuration options passed to the `jhx` function, excluding the `stringify` property. |
| All props for `jhx` | See the [`jhx`](#jhx) section  | Props passed to the wrapped `jhx` function.                                             |

#### Generics

- `TDom` (extends `object`) - Type for the additional DOM variables (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).

## Examples

- [Default `stringify`](#default-stringify)
- [Reusing Handlers](#reusing-handlers)
- [Multiple Instances](#multiple-instances)
- [Custom `render` Handler](#custom-render-handler)
- [Custom `middleware` Handlers](#custom-middleware-handlers)
- [Predefined `routes`](#predefined-routes)
- [DOM Interactions & Type Safety](#dom-interactions--type-safety)

> See additional examples in the [`jhx` repository](https://github.com/nick-hio/jhx/tree/main/packages/jhx):
>
> - [Setting the Request Method](https://github.com/nick-hio/jhx/tree/main/packages/jhx#setting-the-request-method)
> - [`jhx` in JSX (Object Output)](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhx-in-jsx-object-output)
> - [`jhx` in HTML (String Output)](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhx-in-html-string-output)
> - [`JhxComponent` in JSX](https://github.com/nick-hio/jhx/tree/main/packages/jhx#jhxcomponent-in-jsx)
> - [HTMX & DOM Events](https://github.com/nick-hio/jhx/tree/main/packages/jhx#htmx--dom-events)
> - [Advanced Props](https://github.com/nick-hio/jhx/tree/main/packages/jhx#advanced-props)

### Default `stringify`

When initializing with the `createJhx` function, you can set a default `config.stringify` value to be used for **all calls** to the `jhx` function.
This can be overridden on a per-call basis.

This can be useful when you **primarily use the string output (e.g., HTML templating)** in your application more often than the object output (e.g., JSX templating).

```tsx
const { jhx, JhxComponent } = createJhx(app, {
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

You can reuse the same handler function for multiple routes.

```ts
import { JhxHandler } from '@jhxdev/hono';

const handler: JhxHandler = (ctx) => {
    ctx.set.header['content-type'] = 'application/json';
    return { message: 'Response' };
};

jhx({
    get: '/api/1',
    handler,
});

jhx({
    post: '/api/2',
    handler,
});

jhx({
    method: 'get', // generated endpoint
    handler,
});
```

If you want to use the same endpoint for different interactions, only one handler function needs to be called.

```ts
// ensure this is called first to register the route
jhx({
    get: '/api',
    handler: () => `<div>Response</div>`,
});

jhx({
    get: '/api',
});
```

---

### Multiple Instances

Multiple instances of `jhx` and `JhxComponent` can be bound to the same Hono instance by **providing a unique `config.prefix` value with every call** to the `createJhx` function.

```ts
import { Hono } from 'hono';
import { createJhx } from '@jhxdev/hono';

const app = new Hono();

// First instance
const {
    jhx: jhx1,
    JhxComponent: JhxComponent1,
} = createJhx(app, { prefix: '/api-one' });

// Second instance
const {
    jhx: jhx2,
    JhxComponent: JhxComponent2,
} = createJhx(app); // 'config.prefix' defaults to '/_jhx'

// Third instance
const {
    jhx: jhx3,
    JhxComponent: JhxComponent3,
} = createJhx(app, { prefix: '/api-three' });
```

---

### Custom `render` Handler

The `render` handler processes the return values of **all handlers**, unless it is set to `false`, then the handler return values will be sent directly.

```tsx
import { isValidElement } from "react";
import { renderToString } from "react-dom/server";

createJhx(app, {
    render: async (payload, ctx) => {
        if (isValidElement(payload)) {
            return renderToString(payload);
        }
        if (payload instanceof Blob) {
            ctx.set.headers['content-type'] = 'application/octet-stream';
            return Buffer.from(await payload.arrayBuffer());
        }
        return payload;
    },
});
```

---

### Custom `middleware` Handler(s)

You can define one or more middleware handlers to run before the route handlers created by a particular `jhx` function.

When a middleware handler returns a value other than `void`/`undefined`, the value will be sent directly and the route handler will not be executed.

```ts
const { jhx, JhxComponent } = createJhx(app, {
    prefix: '/api',
    middleware: ({ request }) => {
        console.log(`Request made to: ${request.path}`);
    },
});

const { jhx: authJhx, JhxComponent: AuthJhxComponent } = createJhx(app, {
    prefix: '/auth-api',
    middleware: [
        ({ request }) => {
            console.log(`Auth route request made to: ${request.path}`);
        },
        async ({ request, status }) => {
            const authorized = await checkAuth(request);
            if (!authorized) {
                status(401);
                return `<div>Unauthorized</div>`;
            }
        },
    ],
});
```

---

### Predefined `routes`

Since the `jhx` function registers routes at runtime, **some routes will not exist until their corresponding `jhx` function is called**.

To ensure routes are available beforehand, define them by doing at least one of the following:
1. Define the route(s) in the `config.routes` option when calling the `createJhx` function.
2. Call the `jhx` function before starting the server.
3. Use the `addRoute` or `addRoutes` utility functions on the `jhx` instance.

```tsx
const app = new Hono();

// 1.
const { jhx } = createJhx(app, {
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

// 3.
jhx.addRoute({
    route: '/info',
    method: 'GET',
    handler: () => `<div>Info Route</div>`,
});

export default app;
```

---

### DOM Interactions & Type Safety

In all event handlers and DOM-related props, you have access to the `document`, `window`, and `htmx` objects in the DOM.
The `TDom` generic allows you to **define additional variables** that are available in the DOM.

> See the [`jhx` repository](https://github.com/nick-hio/jhx/tree/main/packages/jhx#dom-interactions--type-safety) for more details about the `TDom` generic.

When using the `createJhx` function, you can specify a default `TDom` type which will be used for **all event handlers and DOM-related props** when using `jhx` and `JhxComponent`.
This can be overridden on a per-call basis.

```tsx
type BaseDom = { darkMode?: boolean };

// the variables defined in `BaseDom` will be is available for `jhx` and `JhxComponent`
const { jhx, JhxComponent } = createJhx<BaseDom>(app);

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

type SearchPageDom = { searchQuery: string };

// overrides the default `BaseDom` type
jhx<SearchPageDom>({
    vals: ({ searchQuery }) => ({
        query: searchQuery,
    }),
});
```
