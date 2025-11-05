/**
 * Applies a key-value pairs of HTML attributes to a given element.
 *
 * @param element The target HTML element to apply the attributes to.
 * @param attributes An object containing key-value pairs of HTML attributes.
 *
 * @example
 * ```ts
 * import { applyAttributes } from 'jhx';
 *
 * const button = document.createElement('button');
 * applyAttributes(button, {
 *   'hx-get': '/api',
 *   'hx-swap': 'outerHTML',
 *   'custom-attribute': { id: 123, name: 'test' },
 * });
 * ```
 */
export const applyAttributes = (element: Element, attributes: Record<string, unknown>): void => {
    for (const [key, value] of Object.entries(attributes)) {
        if (typeof value === 'object') {
            element.setAttribute(key, JSON.stringify(value));
        } else {
            element.setAttribute(key, String(value));
        }
    }
};
