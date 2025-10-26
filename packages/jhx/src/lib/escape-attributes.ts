import { escapeValue } from '../helpers/escape-value';

/**
 * Escapes the HTML characters an object's string type values.
 *
 * @param attributes An object representing HTML attributes and event handlers.
 */
export const escapeAttributes = <T = Record<string, any>>(attributes: Record<string, any>): T => {
    const escapedAttributes: Record<string, any> = {};
    for (const [key, value] of Object.entries(attributes)) {
        escapedAttributes[key] = typeof value === 'string' ? escapeValue(value) : value;
    }
    return escapedAttributes as T;
};
