export interface HtmxExtensionObject {
    name: string;
    version: string;
    npm?: string;
    cdn?: {
        src: string;
        integrity?: string;
    }[];
}

/**
 * @see https://htmx.org/extensions/
 */
export const extension = {
    /**
     * Provides support for merging head tag information (styles, etc.) in htmx requests.
     *
     * @see https://htmx.org/extensions/head-support/
     * @see https://htmx.org/extensions/
     */
    headSupport: {
        name: 'head-support',
        version: '2.0.2',
        npm: 'htmx-ext-head-support',
        cdn: [
            {
                src: 'https://cdn.jsdelivr.net/npm/htmx-ext-head-support@2.0.2',
                integrity: 'sha384-cvMqHzjCJsOHgGuyB3sWXaUSv/Krm0BdzjuI1rtkjCbL1l1oHJx+cHyVRJhyuEz0',
            },
        ],
    },

    /**
     * Rolls back most of the behavioral changes of htmx 2 to the htmx 1 defaults.
     *
     * @see https://htmx.org/extensions/htmx-1-compat/
     * @see https://htmx.org/extensions/
     */
    htmx1Compat: {
        name: 'htmx-1-compat',
        version: '2.0.0',
        npm: 'htmx-ext-htmx-1-compat',
        cdn: [
            {
                src: 'https://cdn.jsdelivr.net/npm/htmx-ext-htmx-1-compat@2.0.0',
                integrity: 'sha384-lcvVWaNjF5zPPUeeWmC0OkJ2MLqoWLlkAabuGm+EuMSTfGo5WRyHrNaAp0cJr9Pg',
            },
        ],
    },

    /**
     * Provides a morph swap strategy based on the [idiomorph](https://github.com/bigskysoftware/idiomorph/)
     * morphing library, which was created by the htmx team.
     *
     * @see https://htmx.org/extensions/idiomorph/
     * @see https://htmx.org/extensions/
     */
    idiomorph: {
        name: 'morph',
        version: '0.7.3',
        npm: 'idiomorph',
        cdn: [
            {
                src: 'https://unpkg.com/idiomorph@0.7.3',
                integrity: 'sha384-JcorokHTL/m+D6ZHe2+yFVQopVwZ+91GxAPDyEZ6/A/OEPGEx1+MeNSe2OGvoRS9',
            },
            {
                src: 'https://unpkg.com/idiomorph@0.7.3/dist/idiomorph-ext.min.js',
                integrity: 'sha384-szktAZju9fwY15dZ6D2FKFN4eZoltuXiHStNDJWK9+FARrxJtquql828JzikODob',
            },
        ],
    },

    /**
     * 	This extension allows you to load HTML fragments into your browser’s cache before they are
     * 	requested by the user, so that additional pages appear to users to load nearly instantaneously.
     *
     * @see https://htmx.org/extensions/preload/
     * @see https://htmx.org/extensions/
     */
    preload: {
        name: 'preload',
        version: '2.1.0',
        npm: 'htmx-ext-preload',
        cdn: [
            {
                src: 'https://cdn.jsdelivr.net/npm/htmx-ext-preload@2.1.0',
                integrity: 'sha384-fkzubQiTB69M7XTToqW6tplvxAOJkqPl5JmLAbumV2EacmuJb8xEP9KnJafk/rg8',
            },
        ],
    },

    /**
     * This extension allows you to specify different target elements to be swapped when
     * different HTTP response codes are received.
     *
     * @see https://htmx.org/extensions/response-targets
     * @see https://htmx.org/extensions/
     */
    responseTargets: {
        name: 'response-targets',
        version: '2.0.2',
        npm: 'htmx-ext-response-targets',
        cdn: [
            {
                src: 'https://cdn.jsdelivr.net/npm/htmx-ext-response-targets@2.0.2',
                integrity: 'sha384-T41oglUPvXLGBVyRdZsVRxNWnOOqCynaPubjUVjxhsjFTKrFJGEMm3/0KGmNQ+Pg',
            },
        ],
    },

    /**
     * Provides support for
     * [Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
     * directly from HTML.
     *
     * @see https://htmx.org/extensions/sse
     * @see https://htmx.org/extensions/
     */
    sse: {
        name: 'sse',
        version: '2.2.2',
        npm: 'htmx-ext-sse',
        cdn: [
            {
                src: 'https://cdn.jsdelivr.net/npm/htmx-ext-sse@2.2.2',
                integrity: 'sha384-Y4gc0CK6Kg+hmulDc6rZPJu0tqvk7EWlih0Oh+2OkAi1ZDlCbBDCQEE2uVk472Ky',
            },
        ],
    },

    /**
     * Provides bi-directional communication with
     * [Web Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
     * servers directly from HTML.
     *
     * @see https://htmx.org/extensions/ws
     * @see https://htmx.org/extensions/
     */
    ws: {
        name: 'ws',
        version: '2.0.2',
        npm: 'htmx-ext-ws',
        cdn: [
            {
                src: 'https://cdn.jsdelivr.net/npm/htmx-ext-ws@2.0.2',
                integrity: 'sha384-vuKxTKv5TX/b3lLzDKP2U363sOAoRo5wSvzzc3LJsbaQRSBSS+3rKKHcOx5J8doU',
            },
        ],
    },
} as const;

/** @see https://htmx.org/extensions */
export type DefaultHtmxExtension = keyof typeof extension;
