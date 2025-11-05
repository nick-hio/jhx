import { escapeValue } from '../helpers/escape-value';

/**
 * Escapes HTML special characters in all string values within the provided object.
 *
 * @param attributes An object containing key-value pairs of HTML attributes.
 */
export const escapeAttributes = <T = Record<string, any>>(attributes: Record<string, any>): T => {
    const escapedAttributes: Record<string, any> = {};
    for (const [key, value] of Object.entries(attributes)) {
        escapedAttributes[key] = typeof value === 'string' ? escapeValue(value) : value;
    }
    return escapedAttributes as T;
};
