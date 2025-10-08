/**
 * Convert an object of attributes to a string suitable for HTML tags.
 *
 * @template T Type of the attribute keys.
 */
export const attributesToString = (attributes: Record<string, unknown>): string => {
    return Object.entries(attributes)
        .map(([key, value]) => `${key}="${String(value).replace(/"/g, '&quot;')}"`)
        .filter(Boolean)
        .join(' ');
};
