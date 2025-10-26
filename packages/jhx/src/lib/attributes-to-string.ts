import { escapeValue } from '../helpers/escape-value';

/**
 * Converts a record of attributes into an HTML element attribute string.
 *
 * Typically used to format the attributes before sending to the client.
 *
 * @param attributes An object representing HTML attributes.
 * @param escape Whether to escape the HTML characters in the string values. Defaults to `true`.
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
export const attributesToString = (attributes: Record<string, unknown>, escape: boolean = true): string => {
    return Object.entries(attributes)
        .map(([key, value]) => {
            return typeof value === 'object'
                ? `${key}="${JSON.stringify(value)}"`
                : `${key}="${typeof value === 'string' && escape ? escapeValue(value) : value}"`;
        })
        .filter(Boolean)
        .join(' ');
};
