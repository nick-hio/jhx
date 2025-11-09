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

# jhx

- **HTMX helper for React/JSX, HTML, SSR/edge, and server frameworks.**  
  Dedicated types with strong inference for HTMX patterns, features, and extensions.
- **Type-safe HTMX attribute and event mapping.**  
  Converts typed props into valid HTMX `hx-*` attributes for templating.
- **Streamlines developer experience for complex HTMX applications.**  
  Simplifies the development of large HTMX applications with advanced interactions.

> [!NOTE]
> Check out the server adapters for framework integrations:
> - [**Elysia** - `@jhxdev/elysia`](https://github.com/nick-hio/jhx/tree/main/packages/elysia)
> - [**Express** - `@jhxdev/express`](https://github.com/nick-hio/jhx/tree/main/packages/express)
> - [**Fastify** - `@jhxdev/fastify`](https://github.com/nick-hio/jhx/tree/main/packages/fastify)
> - [**Hono** - `@jhxdev/hono`](https://github.com/nick-hio/jhx/tree/main/apps/hono)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [`jhx`](#jhx-1)
  - [`JhxComponent`](#jhxcomponent)
  - [`htmx`](#htmx)
- [Examples](#examples)
  - [Setting the Request Method](#setting-the-request-method)
  - [`jhx` in JSX (Object Output)](#jhx-in-jsx-object-output)
  - [`jhx` in HTML (String Output)](#jhx-in-html-string-output)
  - [`JhxComponent` in JSX](#jhxcomponent-in-jsx)
  - [HTMX & DOM Events](#htmx--dom-events)
  - [DOM Interactions & Type Safety](#dom-interactions--type-safety)
  - [Advanced Props](#advanced-props)

## Installation

Install via your preferred package manager:

```
pnpm install jhx
npm install jhx
bun add jhx
yarn add jhx
```

Import the package:

```ts
// ESM import
import { jhx, JhxComponent, htmx } from 'jhx';

// CJS import
const { jhx, JhxComponent, htmx } = require('jhx');
```

## Quick Start

Generate HTMX attributes for JSX props:

```jsx
import { jhx } from 'jhx';

const attrs = jhx({
    get: '/api',
    target: '#container',
});

const Button = () => (<button {...attrs}>Load Data</button>);
// <button hx-get="/api" hx-target="#container">Load Data</button>
```

Generate HTMX attributes as a string for HTML templating:

```js
import { jhx } from 'jhx';

const attrs = jhx({
    get: '/api',
    target: '#container',
}, { stringify: true }); // set 'stringify' to 'true'

const button = `<button ${attrs}>Load Data</button>`;
// <button hx-get="/api" hx-target="#container">Load Data</button>
```

Generate HTMX attributes with the JSX component:

```jsx
import { JhxComponent } from 'jhx';

const button = (
    <JhxComponent
        as='button' // set the element tag (defaults to 'div')
        post='/api'
        target='#container'
    >
        Load Data
    </JhxComponent>
);
// <button hx-post="/api" hx-target="#container">Load Data</button>
```

## API

> See the [Examples](#examples) section for usage.

### `jhx`

A function that transforms props into an object of HTMX attributes.

```ts
function jhx<TDom>(props: JhxDomProps<TDom>, config?: JhxConfig & { stringify: true }): string;
function jhx<TDom>(props: JhxProps<TDom>, config?: JhxConfig & { stringify?: false }): Record<JhxAttribute, string>;
```

#### Parameters

##### `props`

An object containing the HTMX attribute values.

> HTMX Documentation: [Core Attributes](https://htmx.org/reference/#attributes), [Additional Attributes](https://htmx.org/reference/#attributes-additional)

| Property      | HTMX Attribute                                                    | Type                          | Description                                                                                                           |
|---------------|-------------------------------------------------------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `boost`       | [`hx-boost`](https://htmx.org/attributes/hx-boost/)               | `boolean`                     | Enables link/form boosting.                                                                                           |
| `confirm`     | [`hx-confirm`](https://htmx.org/attributes/hx-confirm/)           | `string`                      | Confirmation text before the request is sent.                                                                         |
| `delete`      | [`hx-delete`](https://htmx.org/attributes/hx-delete/)             | `string`                      | DELETE request path. Overrides the `route` and `method` props.                                                        |
| `disable`     | [`hx-disable`](https://htmx.org/attributes/hx-disable/)           | `boolean`                     | Disables an element for HTMX behavior.                                                                                |
| `disabledElt` | [`hx-disabled-elt`](https://htmx.org/attributes/hx-disabled-elt/) | `JhxTargetAttribute`          | Element(s) to disable during the request.                                                                             |
| `disinherit`  | [`hx-disinherit`](https://htmx.org/attributes/hx-disinherit/)     | `JhxInheritAttribute`         | Prevent inheritance of specific attributes.                                                                           |
| `encoding`    | [`hx-encoding`](https://htmx.org/attributes/hx-encoding/)         | `string`                      | Request encoding (e.g., `multipart/form-data`).                                                                       |
| `ext`         | [`hx-ext`](https://htmx.org/attributes/hx-ext/)                   | `JhxExtensionAttribute`       | Enable/disable extensions for an element (`string` or array of `{ name, ignore? }`).                                  |
| `get`         | [`hx-get`](https://htmx.org/attributes/hx-get/)                   | `string`                      | GET request path. Overrides the `route` and `method` props.                                                           |
| `headers`     | [`hx-headers`](https://htmx.org/attributes/hx-headers/)           | `JhxEvaluableAttribute<TDom>` | Additional headers to include in the request; `object`, `string`, or `function` evaluated client-side when triggered. |
| `history`     | [`hx-history`](https://htmx.org/attributes/hx-history/)           | `boolean`                     | Enable/disable history support for an element.                                                                        |
| `historyElt`  | [`hx-history-elt`](https://htmx.org/attributes/hx-history-elt/)   | `boolean`                     | Set the element as a history element.                                                                                 |
| `include`     | [`hx-include`](https://htmx.org/attributes/hx-include/)           | `JhxTargetAttribute`          | Additional element values to include in the request.                                                                  |
| `indicator`   | [`hx-indicator`](https://htmx.org/attributes/hx-indicator/)       | `JhxIndicatorAttribute`       | Loading indicator element; supports `closest` and `inherit`.                                                          |
| `inherit`     | [`hx-inherit`](https://htmx.org/attributes/hx-inherit/)           | `JhxInheritAttribute`         | Inherit attributes from other elements.                                                                               |
| `method`      | `hx-<method>`                                                     | `HtmxHttpMethod \| string`    | HTTP method for the request. Must paired with the `route` prop (unless using an adapter package).                     |
| `params`      | [`hx-params`](https://htmx.org/attributes/hx-params/)             | `JhxParamsAttribute`          | Include/exclude parameters with the request.                                                                          |
| `patch`       | [`hx-patch`](https://htmx.org/attributes/hx-patch/)               | `string`                      | PATCH request path. Overrides the `route` and `method` props.                                                         |
| `post`        | [`hx-post`](https://htmx.org/attributes/hx-post/)                 | `string`                      | POST request path. Overrides the `route` and `method` props.                                                          |
| `preserve`    | [`hx-preserve`](https://htmx.org/attributes/hx-preserve/)         | `boolean`                     | Preserve an element state between swaps.                                                                              |
| `prompt`      | [`hx-prompt`](https://htmx.org/attributes/hx-prompt/)             | `string`                      | Prompt user for input before the request is sent.                                                                     |
| `pushUrl`     | [`hx-push-url`](https://htmx.org/attributes/hx-push-url/)         | `boolean \| string`           | Push a new history entry (`true` uses request URL; `string` uses given URL).                                          |
| `put`         | [`hx-put`](https://htmx.org/attributes/hx-put/)                   | `string`                      | PUT request path. Overrides the `route` and `method` props.                                                           |
| `replaceUrl`  | [`hx-replace-url`](https://htmx.org/attributes/hx-replace-url/)   | `boolean \| string`           | Replaces the current history entry.                                                                                   |
| `request`     | [`hx-request`](https://htmx.org/attributes/hx-request/)           | `JhxRequestAttribute<TDom>`   | Request configuration (e.g., `timeout`, `credentials`, `noHeaders`) or a `function` returning it.                     |
| `route`       | `hx-<method>`                                                     | `string`                      | Request path for the `hx-` method attribute. Use the `method` prop to set the request method. Defaults to `hx-get`.   |
| `select`      | [`hx-select`](https://htmx.org/attributes/hx-select/)             | `string`                      | Limit the update to a CSS selector within the response.                                                               |
| `selectOob`   | [`hx-select-oob`](https://htmx.org/attributes/hx-select-oob/)     | `JhxSelectOobAttribute`       | Out-of-band selections to apply from the response.                                                                    |
| `swap`        | [`hx-swap`](https://htmx.org/attributes/hx-swap/)                 | `JhxSwapAttribute`            | Swap behavior (style, delays, `scroll`/`show`, transitions, etc.).                                                    |
| `swapOob`     | [`hx-swap-oob`](https://htmx.org/attributes/hx-swap-oob/)         | `JhxSwapOobAttribute`         | Out-of-band swap behavior.                                                                                            |
| `sync`        | [`hx-sync`](https://htmx.org/attributes/hx-sync/)                 | `JhxSyncAttribute`            | Synchronization strategy for multiple requests.                                                                       |
| `target`      | [`hx-target`](https://htmx.org/attributes/hx-target/)             | `JhxTargetAttribute`          | Target element for swaps.                                                                                             |
| `trigger`     | [`hx-trigger`](https://htmx.org/attributes/hx-trigger/)           | `JhxTriggerAttribute`         | Events and conditions that trigger a request.                                                                         |
| `validate`    | [`hx-validate`](https://htmx.org/attributes/hx-validate/)         | `boolean`                     | Enables HTML5 validation before requests.                                                                             |
| `vals`        | [`hx-vals`](https://htmx.org/attributes/hx-vals/)                 | `JhxEvaluableAttribute<TDom>` | Additional values to include in the request; `object`, `string`, or `function`.                                       |
| `vars`        | `hx-vars`                                                         | `string`                      | Recommended to use `vals`; potential XSS vulnerabilities from `vars`.                                                 |

Event Props:

> HTMX Documentation: [Events](https://htmx.org/reference/#events), [hx-on](https://htmx.org/attributes/hx-on/)
 
| Property                                                                                | HTMX/HTML Attribute                                                                                         | Type                                                                                          | Description                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| HTMX handlers<br>(`onAfterSwap`, `onPrompt`, `onBeforeRequest`, `onAfterRequest`, etc.) | `hx-on:htmx:afterSwap`,<br>`hx-on::prompt`,<br>`hx-on-htmx-before-request`,<br>`hx-on--after-request`, etc. | `({ event } & DomObjects & TDom) => void`<br><br>(See the `HtmxEventProps` type for details)  | HTMX event and lifecycle handlers.<br><br>Serialized to an inline handler for the corresponding `hx-on--` attribute.                                                                                                                                                                                                                       |
| DOM handlers<br>(`onClick`, `onChange`, `onSubmit`, `onKeyDown`, etc.)                  | `onclick`,<br>`onchange`,<br>`onsubmit`,<br>`onkeydown`, etc.                                               | `({ event }: DomEventProps & TDom) => void`<br><br>(See the `DomEventProps` type for details) | Standard DOM event handlers.<br><br>Serialized to inline handler attributes **only when `config.stringify: true`**, otherwise, they are excluded in JSX rendering.<br><br>When serializing, DOM handlers include:<br>- Props from `DomEventProps`.<br>- Function props starting with "on" (e.g., `onCustomEvent` becomes `oncustomevent`). |

##### `config` (optional)

Configuration options for the function.

| Property    | Type      | Description                                                                                                                                                                               |
|-------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `escape`    | `boolean` | Whether to escape the HTML characters in the attribute values. Defaults to `true`.                                                                                                        |
| `logger`    | `Logger`  | Logging functions for debug messages, warnings, and errors from jhx. Defaults to `console`.                                                                                               |
| `stringify` | `boolean` | Converts the result into a string of HTML attributes. Defaults to `false`.<br>- When `true`, returns a string of HTML attributes.<br>- When `false`, returns an object for JSX spreading. |

#### Generics

- `TDom` (extends `object`) - Type for the additional DOM variables (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).

#### Returns

`jhx` will return a `string` when `config.stringify` set to `true`, otherwise, returns a `Record<JhxAttribute, string>`.

---

### `JhxComponent`

JSX wrapper element for the `jhx` function.

```ts
function JhxComponent<TDom>(props: PropsWithChildren<JhxComponentProps<TDom>>): JSX.Element
```

#### Props

| Prop                | Type                            | Description                                                                             |
|---------------------|---------------------------------|-----------------------------------------------------------------------------------------|
| `as`                | `keyof JSX.IntrinsicElements`   | Specifies the element tag for the component. Defaults to `div`.                         |
| `jhxConfig`         | `Omit<JhxConfig, 'stringify'>`  | Configuration options passed to the `jhx` function, excluding the `stringify` property. |
| All props for `jhx` | See the [`jhx`](#jhx-1) section | Props passed to the wrapped `jhx` function.                                             |

#### Generics

- `TDom` (extends `object`) - Type for the additional DOM variables (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).

---

### `htmx`

An object containing constant values for HTMX attributes, events, methods, headers, and other configurations.

> HTMX Documentation: [Reference](https://htmx.org/reference/)

```ts
import { htmx } from 'jhx';

htmx.attr; // HTMX attributes
htmx.config; // default HTMX config
htmx.css; // CSS classes
htmx.event; // HTMX events
htmx.eventAttr; // HTMX event attributes
htmx.ext; // HTMX extensions
htmx.method; // HTTP methods
htmx.res; // response headers
htmx.req; // request headers
htmx.swap; // swap styles
htmx.sync; // synchronization strategies
```

## Examples

- [Setting the Request Method](#setting-the-request-method)
- [`jhx` in JSX (Object Output)](#jhx-in-jsx-object-output)
- [`jhx` in HTML (String Output)](#jhx-in-html-string-output)
- [`JhxComponent` in JSX](#jhxcomponent-in-jsx)
- [HTMX & DOM Events](#htmx--dom-events)
- [DOM Interactions & Type Safety](#dom-interactions--type-safety)
- [Advanced Props](#advanced-props)

### Setting the Request Method

You can set the request method and route by using one of the HTTP verb props or the `method` and `route` props.

```ts
// using HTTP verb props
jhx({ get: '/api' }); // hx-put="/api"
jhx({ post: '/api' }); // hx-post="/api"
jhx({ put: '/api' }); // hx-put="/api"
jhx({ patch: '/api' }); // hx-patch="/api"
jhx({ delete: '/api' }); // hx-delete="/api"

// using 'method' and 'route' props
jhx({ route: '/api' }); // hx-get="/api"
jhx({ route: '/api', method: 'post' }); // hx-post="/api"
jhx({ route: '/api', method: 'OPTIONS' }); // hx-options="/api"

// using 'method' with a generated endpoint (only with adapter packages)
jhx({ method: '/post' }); // hx-post="/api/<GENERATED_ID>"
```

---

### `jhx` in JSX (Object Output)

> **Tip**: If your framework does not support the object syntax, use the `applyAttribute` function to apply the attributes to an HTML element
> or create a custom function to transform the object into your desired shape.

Declaring separately:

```tsx
export function LoadDataButton() {
    const attrs = jhx({
        post: '/api/items',
        target: {
            closest: true,
            selector: '.card',
        },
        swap: {
            style: 'outerHTML',
            settle: 100,
        },
        trigger: {
            event: 'click',
            once: true,
        },
    });

    return (
        <button {...attrs}>
            Submit
        </button>
    )
}
```

Declaring inline:

```tsx
export function SubmitButton() {
    return (
        <button {...jhx({
            post: '/api/items',
            target: {
                closest: true,
                selector: '.card',
            },
            swap: {
                style: 'outerHTML',
                settle: 100,
            },
            trigger: {
                event: 'click',
                once: true,
            },
        })}>
            Submit
        </button>
    )
}
```

---

### `jhx` in HTML (String Output)

DOM event handlers are **only serialized by the `jhx` function when `config.stringify` is set to `true`**.

Declaring separately:

```ts
const attrs = jhx({
    post: '/api/login',
    trigger: 'submit',
    boost: true,
}, { stringify: true });

const html = `
<div>
    <h1>Login</h1>
    <form class="login-form" id="login-form" ${attrs}>
        ...
    </form>
</div>
`;
```

Declaring inline:

```ts
const html = `
<div>
    <h1>Login</h1>
    <form 
        class="login-form"
        id="login-form"
        ${jhx({
            post: '/api/login',
            trigger: 'submit',
            boost: true,
        }, { stringify: true })}
    >
        ...
    </form>
</div>
`;
```

---

### `JhxComponent` in JSX

Using `JhxComponent` directly:

```tsx
function HomePage() {
    return (
        <body>
            <h1>Home Page</h1>
            <JhxComponent
                className="search-form"
                as="form"
                post="/api/search"
                boost={true}
            >
                <input type="text" name="search-input" />
                <button type="submit">Search</button>
            </JhxComponent>
        </body>
    );
}
```

Creating custom components with `JhxComponent`:

```tsx
function Form({ children, endpoint }: { children: React.ReactNode, endpoint: string }) {
    return (
        <JhxComponent
            as="form"
            post={endpoint}
            boost={true}
        >
            {children}
        </JhxComponent>
    );
}

function HomePage() {
    return (
        <body>
            <h1>Home Page</h1>
            <Form endpoint="/api/search">
                <input type="text" name="search-input" />
                <button type="submit">Search</button>
            </Form>
        </body>
    );
}
```

---

### HTMX & DOM Events

Declaring HTMX event handlers:

```tsx
// HTMX events
jhx({
    route: '/api/data',
    onBeforeRequest: ({ event }) => {
        console.log('Sending request', event);
    },
    onAfterSwap: ({ event }) => {
        console.log('Content swapped', event);
    },
    /* ... */
});
```

Declaring DOM event handlers (**only available for the `jhx` function when `config.stringify` is set to `true`**):

```ts
// HTMX & DOM events
jhx({
    route: '/api/data',
    onBeforeRequest: ({ event }) => {
        console.log('Sending request', event);
    },
    onAfterSwap: ({ event }) => {
        console.log('Content swapped', event);
    },
    onSubmit: ({ event }) => {
        console.log("Mouse over!", event);
    },
    onClick: ({ event }) => {
        console.log("Clicked!", event);
    },
    /* ... */
}, { stringify: true }); // 'stringify' must be set to 'true' for DOM handlers
```

---

### DOM Interactions & Type Safety

In all event handlers and DOM-related props, you have access to the `document`, `window`, and `htmx` objects in the DOM.
The `TDom` generic allows you to **define additional variables** that are available in the DOM.

Accessing the DOM from the event handlers:

```tsx
jhx({
    /* HTMX event handlers */
    onBeforeRequest: ({ document, window, htmx }) => {
        console.log('document object', document);
        console.log('window object', window);
        console.log('HTMX instance', htmx);
    },
    /* DOM event handlers (only available when `stringify: true`) */
    onClick: ({ document, window, htmx }) => {
        console.log('document object', document);
        console.log('window object', window);
        console.log('HTMX instance', htmx);
    },
    /* ... */
}, { stringify: true });
```

Accessing additional DOM variables by using the `TDom` generic with `jhx`:

```tsx
import type { Alpine } from 'alpinejs'; // using Alpine.js

// define the variables that are available in the DOM
type Dom = {
    valueOne: 'constant-value';
    valueTwo: number;
    Alpine: Alpine;
};

const html = `
<head>
    <script src="//unpkg.com/alpinejs" defer></script>
</head>
<body>
    <h1>Home Page</h1>
    <button ${
        jhx<Dom>({ // specify the generic
            route: '/api',
            onBeforeRequest: ({ valueOne, valueTwo, Alpine }) => {
                // type safe access to the defined DOM variables
                console.log('valueOne variable', valueOne);
                console.log('valueTwo variable', valueTwo);
                console.log('Alpine instance', Alpine);
            },
            onClick: ({ valueOne, valueTwo, Alpine }) => {
                // type safe access to the defined DOM variables
                console.log('valueOne variable', valueOne);
                console.log('valueTwo variable', valueTwo);
                console.log('Alpine instance', Alpine);
            },
        }, { stringify: true })
    }>
        Load Data
    </button>
    <script>
        const valueOne = 'constant-value';
        const valueTwo = Math.random() * 100;
    </script>
</body>
`;
```

- Accessing additional DOM variables by using the `TDom` generic with `JhxComponent`:

```tsx
import type { Alpine } from 'alpinejs'; // using Alpine.js

// define the variables that are available in the DOM
type Dom = {
    Alpine: Alpine;
};

function HomePage() {
    return (
        // Alpine.js initialized in `<head>`
        <main>
            <h1>Home Page</h1>
            <JhxComponent<Dom> // specify the generic
                as='button'
                route='/api'
                onBeforeRequest={({ Alpine }) => {
                    // type safe access to the defined DOM variables
                    console.log('Alpine instance', Alpine);
                }}
                /* ... */
            >
                Load Data
            </JhxComponent>
        </main>
    );
}
```

---

### Advanced Props

- [`disabledElt`, `include`, and `target`](#disabledelt-include-and-target)
- [`disinherit` and `inherit`](#disinherit-and-inherit)
- [`ext`](#ext)
- [`headers` and `vals`](#headers-and-vals)
- [`indicator`](#indicator)
- [`params`](#params)
- [`request`](#request)
- [`selectOob`](#selectoob)
- [`swap`](#swap)
- [`swapOob`](#swapoob)
- [`sync`](#sync)
- [`trigger`](#trigger)

> HTMX Documentation: [Reference](https://htmx.org/reference/)

#### `disabledElt`, `include`, and `target`

Disabling the nearest card and include its input values; target the card for the swap:

```tsx
function SaveCard() {
    return (
        <div className="card">
            <input name="title" placeholder="Title" />
            <button {...jhx({
                post: '/cards/1',
                include: {
                    position: 'closest',
                    selector: '.card',
                },
                disabledElt: {
                    position: 'closest',
                    selector: '.card',
                },
                target: {
                    position: 'closest',
                    selector: '.card',
                },
                swap: htmx.swap.outerHTML,
            })}>
                Save
            </button>
        </div>
    );
}
```

Disabling and including items in a bulk action:

```tsx
function BulkArchive() {
    return (
        <div className="toolbar">
            <button id="archive" {...jhx({
                post: '/items/archive',
                include: '.list input[type=checkbox]:checked',
                disabledElt: [
                    '#archive',
                    {
                        position: 'closest',
                        selector: '.toolbar',
                    }
                ],
                target: {
                    position: 'find',
                    selector: '#results',
                },
                swap: htmx.swap.innerHTML,
            })}>
                Archive Selected
            </button>
        </div>
    );
}
```

#### `disinherit` and `inherit`

Providing default target/swap for children with a child opting out of inheriting the target:

```tsx
function ListActions() {
    return (
        <div {...jhx({
            inherit: ['hx-target', 'hx-swap'],
            target: '#list',
            swap: htmx.swap.beforeEnd,
        })}>
            <button {...jhx({get: '/list?page=2'})}>
                Load More (inherits target/swap)
            </button>
            <button {...jhx({
                get: '/stats',
                disinherit: htmx.attr.target,
                target: '#stats',
            })}>
                Load Stats
            </button>
        </div>
    );
}
```

Inheriting everything from the parent with a child opting out from headers and target:

```tsx
function Screen() {
    return (
        <div {...jhx({
            inherit: '*',
            headers: {'X-App': 'demo'},
            target: '#main',
        })}>
            <a {...jhx({
                boosted: true,
                get: '/home',
            })}>
                Home
            </a>
            <button {...jhx({
                disinherit: [
                    htmx.attr.headers,
                    htmx.attr.target,
                ],
                post: '/logout',
                target: 'this',
                swap: 'none',
            })}>
                Logout (no inherit)
            </button>
        </div>
    );
}
```

#### `ext`

Enabling `sse` and `preload` extensions:

```tsx
function LiveFeed() {
    return (
        <div {...jhx({
            get: '/events',
            ext: ['sse', 'preload'],
            trigger: 'load',
            target: '#feed',
            swap: 'beforeend',
        })} />
    );
}
```

Using `morph` (idiomorph) and ignoring on a child:

```tsx
function MorphList() {
    return (
        <div {...jhx({ ext: 'morph' })}>
            <button {...jhx({
                get: '/items',
                target: '#list',
                swap: 'morph',
                ext: {
                    name: 'morph',
                    ignore: true,
                },
            })}>
                Refresh (no morph)
            </button>
            <ul id="list" />
        </div>
    );
}
```

#### `headers` and `vals`

The `JhxEvaluableAttribute` type allows you to define static or dynamic values:
- When using a **function**, it will be evaluated client-side at trigger time.
  - Function parameters can access the DOM and use `TDom` generic (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).
- When using a **string** or **object**, it will be evaluated at server-render time.

Computing headers and values at server-render time:

```tsx
function CreateItem() {
    return (
        <button {...jhx({
            post: '/api/items',
            headers: {
                'X-CSRF-TOKEN': 'ABCD1234',
            },
            vals: {
                source: 'ui',
                scope: 'dashboard',
            },
            target: '#result',
        })}>
            Create
        </button>
    );
}
```

Computing headers and values with client-side functions:

```tsx
function SearchButton() {
    return (
        <button {...jhx({
            post: '/api/search',
            headers: ({ window }) => ({
                'X-Viewport': `${window.innerWidth}x${window.innerHeight}`,
            }),
            vals: ({ document }) => ({
                q: document.getElementById('search-query')?.value ?? '',
            }),
            target: '#results',
        })}>
            Search
        </button>
    );
}
```

#### `indicator`

Using a spinner element:

```tsx
function Toolbar() {
    return (
        <div className="toolbar">
            <button {...jhx({
                get: '/api/list',
                target: '#list',
                indicator: '#spinner',
            })}>
                Refresh
            </button>
            <span id="spinner" className="hidden">
                Loading...
            </span>
            <div id="list" />
        </div>
    );
}
```

Using a spinner element in the closest row:

```tsx
function ItemRow() {
    return (
        <div className="row">
            <button {...jhx({
                post: '/api/item/1/like',
                indicator: {
                    selector: '.spinner',
                    closest: true,
                },
            })}>
                Like
            </button>
            <span className="spinner hidden">{/* ... */}</span>
        </div>
    );
}
```

#### `params`

Exclude fields from a form submission:

```tsx
function SignUpForm() {
    return (
        <form {...jhx({
            boosted: true,
            post: '/signup',
            params: { exclude: ['password-confirm'] },
        })}>
            <input name="email" />
            <input name="password" type="password" />
            <input name="password-confirm" type="password" />
            <button type="submit">Sign up</button>
        </form>
    );
}
```

Include parameters in a get request:

```tsx
function SearchForm() {
    return (
        <form {...jhx({
            boosted: true,
            get: '/search',
            params: { include: ['q', 'page'] },
        })}>
            <input id="q" name="q" />
            <input name="page" type="hidden" value="1" />
            <input name="debug" />
            <button type="submit">Search</button>
        </form>
    );
}
```

#### `request`

The `JhxRequestAttribute` type allows you to define static or dynamic values:
- When using a **function**, it will be evaluated client-side at trigger time.
  - Function parameters can access the DOM and use `TDom` generic (see the [DOM Interactions & Type Safety](#dom-interactions--type-safety) section for usage).
- When using a **string** or **object**, it will be evaluated at server-render time.

Computing request values at server-render time:

```tsx
function SlowAction() {
    return (
        <button {...jhx({
            get: '/slow',
            request: {
                timeout: 8000,
                credentials: true,
            },
        })}>
            Load
        </button>
    );
}
```

Computing request values with a client-side function:

```tsx
function FetchData() {
    return (
        <button {...jhx({
            get: '/data',
            request: ({ window }) => ({
                timeout: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 10000 : 3000,
                noHeaders: true,
            }),
        })}>
            Fetch
        </button>
    );
}
```

#### `selectOob`

Update head elements out-of-band:

```tsx
function NavLink() {
    return (
        <a {...jhx({
            boosted: true,
            get: '/page',
            selectOob: ['title', 'meta[name=description]'],
            pushUrl: true,
        })}>
            Open Page
        </a>
    );
}
```

Apply out-of-band selection with a specific swap style and avoid main target swap:

```tsx
function ShowToast() {
    return (
        <button {...jhx({
            get: '/alerts',
            swap: 'none',
            selectOob: {
                selector: '#toast',
                swap: htmx.swap.afterEnd,
            },
        })}>
            Show Toast
        </button>
    );
}
```

#### `swap`

Delay the swap/settle:

```tsx
function RefreshCard() {
    return (
        <button {...jhx({
            get: '/items/1',
            target: '.card',
            swap: {
                style: htmx.swap.outerHTML,
                swap: '200ms', settle: '100ms',
            },
        })}>
            Refresh
        </button>
    );
}
```

Load button with transition and infinite scroll:

```tsx
function LoadButton() {
    return (
        <button {...jhx({
            get: '/list?page=2',
            target: '#list',
            swap: {
                style: htmx.swap.afterEnd,
                scroll: {
                    selector: '#list',
                    position: 'bottom',
                },
                show: 'bottom',
                transition: true,
            },
        })}>
            Load more
        </button>
    );
}
```

#### `swapOob`

Mark a fragment to swap out-of-band:

```tsx
function CartItem({ children }: { children: React.ReactNode }) {
    return (
        <div {...jhx({
            swapOob: true,
        })}>
            {children}
        </div>
    );
}
```

Append a notification item to a container:

```tsx
function NotificationItem({ message }: { message: string }) {
    return (
        <li
            className="search"
            {...jhx({
                swapOob: {
                    swap: htmx.swap.beforeEnd,
                    selector: '#notifications',
                },
            })}
        >
            {message}
        </li>
    );
}
```

#### `sync`

Queue on the nearest ".search" container while typing:

```tsx
function SearchInput() {
    return (
        <div className="search">
            <input {...jhx({
                get: '/search',
                target: '#results',
                trigger: {
                    event: 'input',
                    throttle: '300ms'
                },
                sync: {
                    strategy: htmx.sync.queueFirst,
                    tag: '.search',
                    closest: true
                },
            })} />
            <div id="results"/>
        </div>
    );
}
```

Replace an in-flight request with the latest:

```tsx
function PollStatus() {
    return (
        <button {...jhx({
            get: '/status',
            trigger: {
                poll: '5s',
            },
            sync: {
                strategy: htmx.sync.replace,
            },
        })}>
            Start Polling
        </button>
    );
}
```

#### `trigger`

Text input with throttle and queue behavior:

```tsx
function FilterInput() {
    return (
        <input {...jhx({
            get: '/filter',
            target: '#out',
            trigger: {
                event: 'input',
                changed: true,
                throttle: '300ms',
                queue: 'last'
            },
        })} />
    );
}
```

Lazy-load when element intersects viewport (only once):

```tsx
function LazySection() {
    return (
        <div {...jhx({
            get: '/lazy-content',
            trigger: {
                trigger: 'intersect',
                threshold: 0.25,
                once: true,
            },
        })} />
    );
}
```
