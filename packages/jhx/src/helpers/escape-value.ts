const escapeMap: Record<string, string> = {
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
} as const;

export const escapeValue = (input: unknown): string =>
    String(input).replace(/["<>]/g, (ch) => escapeMap[ch] ?? ch);
