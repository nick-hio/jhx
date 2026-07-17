/**
 * Converts a record of HTML attributes into an HTML element attribute string.
 *
 * Typically used to format the attributes before sending to the client.
 *
 * @param attributes An object containing key-value pairs of HTML attributes.
 *
 * @example
 * ```ts
 * import { attributesToString } from 'jhx';
 *
 * const attrs = attributesToString({
 *   'hx-get': '/api',
 *   'hx-swap': 'outerHTML',
 * });
 * // 'hx-get="/api" hx-swap="outerHTML"'
 *
 * const html = `<button ${attrs}>Click Me</button>`;
 * ```
 */
export const attributesToString = (attributes: Record<string, unknown>): string => {
    return Object.entries(attributes)
        .map(([key, value]) => `${key}="${typeof value === 'object' ? JSON.stringify(value) : value}"`)
        .filter(Boolean)
        .join(' ');
};
