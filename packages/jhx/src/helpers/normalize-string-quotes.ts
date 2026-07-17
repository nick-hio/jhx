/**
 * Converts double-quoted strings to single-quoted strings in JavaScript code.
 * If a double-quoted string contains template expressions (`${...}`), it is
 * converted to a backtick template literal instead.
 *
 * This is needed because Bun's `Function.prototype.toString()` normalizes all
 * string literals to use double quotes, which are escaped when embedded in HTML.
 *
 * @param code The JavaScript function code to normalize.
 * @returns The code with double-quoted strings converted to single quotes or backticks.
 */
export const normalizeStringQuotes = (code: string): string => {
    const result: string[] = [];
    let i = 0;

    while (i < code.length) {
        const char = code[i];

        // Handle template literals - leave them as-is
        if (char === '`') {
            const start = i;
            i++;
            while (i < code.length) {
                if (code[i] === '\\') {
                    i += 2; // Skip escaped character
                } else if (code[i] === '`') {
                    i++;
                    break;
                } else {
                    i++;
                }
            }
            result.push(code.slice(start, i));
            continue;
        }

        // Handle double-quoted strings - convert to single quotes or backticks
        if (char === '"') {
            i++;

            // First pass: extract the string content and check for template expressions
            const stringContent: string[] = [];
            let hasTemplateExpression = false;

            while (i < code.length) {
                if (code[i] === '\\') {
                    const nextChar = code[i + 1];
                    stringContent.push(code[i]!, nextChar ?? '');
                    i += 2;
                } else if (code[i] === '"') {
                    i++;
                    break;
                } else {
                    // Check for template expression ${...}
                    if (code[i] === '$' && code[i + 1] === '{') {
                        hasTemplateExpression = true;
                    }
                    stringContent.push(code[i]!);
                    i++;
                }
            }

            const rawContent = stringContent.join('');

            if (hasTemplateExpression) {
                // Convert to backtick template literal
                result.push('`');
                for (let j = 0; j < rawContent.length; j++) {
                    if (rawContent[j] === '\\') {
                        const nextChar = rawContent[j + 1];
                        if (nextChar === '"') {
                            // Convert escaped double quote to just a double quote
                            result.push('"');
                            j++;
                        } else if (nextChar === '`') {
                            // Keep escaped backtick
                            result.push('\\`');
                            j++;
                        } else {
                            // Keep other escapes as-is
                            result.push(rawContent[j]!, nextChar ?? '');
                            j++;
                        }
                    } else if (rawContent[j] === '`') {
                        // Escape backticks in template literal
                        result.push('\\`');
                    } else {
                        result.push(rawContent[j]!);
                    }
                }
                result.push('`');
            } else {
                // Convert to single-quoted string
                result.push("'");
                for (let j = 0; j < rawContent.length; j++) {
                    if (rawContent[j] === '\\') {
                        const nextChar = rawContent[j + 1];
                        if (nextChar === '"') {
                            // Convert escaped double quote to just a double quote
                            result.push('"');
                            j++;
                        } else if (nextChar === "'") {
                            // Keep escaped single quote as-is
                            result.push("\\'");
                            j++;
                        } else {
                            // Keep other escapes as-is
                            result.push(rawContent[j]!, nextChar ?? '');
                            j++;
                        }
                    } else if (rawContent[j] === "'") {
                        // Escape single quotes that appear in the original string
                        result.push("\\'");
                    } else {
                        result.push(rawContent[j]!);
                    }
                }
                result.push("'");
            }
            continue;
        }

        // Handle single-quoted strings - leave them as-is
        if (char === "'") {
            const start = i;
            i++;
            while (i < code.length) {
                if (code[i] === '\\') {
                    i += 2; // Skip escaped character
                } else if (code[i] === "'") {
                    i++;
                    break;
                } else {
                    i++;
                }
            }
            result.push(code.slice(start, i));
            continue;
        }

        // Handle regular expressions to avoid false positives
        if (char === '/' && i > 0) {
            // Check if this could be a regex (very basic heuristic)
            const prevNonSpace = code.slice(0, i).trimEnd().slice(-1);
            const regexPreceding = ['=', '(', ',', '[', '!', '&', '|', ':', ';', '{', '}', '?'];
            if (regexPreceding.includes(prevNonSpace)) {
                const start = i;
                i++;
                let inCharClass = false;
                while (i < code.length) {
                    if (code[i] === '\\') {
                        i += 2;
                    } else if (code[i] === '[') {
                        inCharClass = true;
                        i++;
                    } else if (code[i] === ']') {
                        inCharClass = false;
                        i++;
                    } else if (code[i] === '/' && !inCharClass) {
                        i++;
                        // Skip regex flags
                        while (i < code.length && /[gimsuy]/.test(code[i]!)) {
                            i++;
                        }
                        break;
                    } else {
                        i++;
                    }
                }
                result.push(code.slice(start, i));
                continue;
            }
        }

        result.push(char!);
        i++;
    }

    return result.join('');
};
