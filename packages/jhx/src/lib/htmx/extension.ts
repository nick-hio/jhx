/**
 * Metadata for official htmx extensions.
 *
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
        /* Name of the extension for use in attributes. */
        name: 'head-support',
        /* Current version of the extension. */
        version: '2.0.5',
        /* NPM registry name. */
        npm: 'htmx-ext-head-support',
        /* CDN URL(s) and integrity hashes. */
        cdn: [
            {
                /* CDN URL of the extension file. */
                url: 'https://cdn.jsdelivr.net/npm/htmx-ext-head-support@2.0.5',
                /* Integrity hash for the extension file. */
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
        version: '2.0.2',
        npm: 'htmx-ext-htmx-1-compat',
        cdn: [
            {
                url: 'https://cdn.jsdelivr.net/npm/htmx-ext-htmx-1-compat@2.0.2',
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
        version: '0.7.4',
        npm: 'idiomorph',
        cdn: [
            {
                url: 'https://unpkg.com/idiomorph@0.7.4/dist/idiomorph-ext.min.js',
                integrity: 'sha384-SsScJKzATF/w6suEEdLbgYGsYFLzeKfOA6PY+/C5ZPxOSuA+ARquqtz/BZz9JWU8',
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
        version: '2.1.2',
        npm: 'htmx-ext-preload',
        cdn: [
            {
                url: 'https://cdn.jsdelivr.net/npm/htmx-ext-preload@2.1.2',
                integrity: 'sha384-PRIcY6hH1Y5784C76/Y8SqLyTanY9rnI3B8F3+hKZFNED55hsEqMJyqWhp95lgfk',
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
        version: '2.0.4',
        npm: 'htmx-ext-response-targets',
        cdn: [
            {
                url: 'https://cdn.jsdelivr.net/npm/htmx-ext-response-targets@2.0.4',
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
        version: '2.2.4',
        npm: 'htmx-ext-sse',
        cdn: [
            {
                url: 'https://cdn.jsdelivr.net/npm/htmx-ext-sse@2.2.4',
                integrity: 'sha384-A986SAtodyH8eg8x8irJnYUk7i9inVQqYigD6qZ9evobksGNIXfeFvDwLSHcp31N',
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
        version: '2.0.4',
        npm: 'htmx-ext-ws',
        cdn: [
            {
                url: 'https://cdn.jsdelivr.net/npm/htmx-ext-ws@2.0.4',
                integrity: 'sha384-1RwI/nvUSrMRuNj7hX1+27J8XDdCoSLf0EjEyF69nacuWyiJYoQ/j39RT1mSnd2G',
            },
        ],
    },
} as const;
