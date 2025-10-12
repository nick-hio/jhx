const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;',
};

const escapeValue = (input: unknown): string => String(input).replace(/[&"'<>]/g, ch => escapeMap[ch] ?? ch);

/**
 * Convert an object of attributes to a string suitable for HTML tags.
 *
 * @template T Type of the attribute keys.
 */
export const attributesToString = (attributes: Record<string, unknown>): string => {
    return Object.entries(attributes)
        .map(([key, value]) => `${key}="${escapeValue(value)}"`)
        .filter(Boolean)
        .join(' ');
};
