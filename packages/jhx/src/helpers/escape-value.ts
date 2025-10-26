const escapeMap: Record<string, string> = {
    '=': '&#61;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
    '<': '&lt;',
    '>': '&gt;',
} as const;

export const escapeValue = (input: unknown): string =>
    String(input).replace(/[=&"'`<>]/g, (ch) => escapeMap[ch] ?? ch);
