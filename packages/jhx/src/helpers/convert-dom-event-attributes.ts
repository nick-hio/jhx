import { eventAttribute } from '../lib/htmx/event-attribute';
import type { DomEventProps } from '../types';
import { extractFunction } from './extract-function';

export const convertDomEventAttributes = (
    props: Record<string, any>,
): Record<keyof DomEventProps, string> => {
    const events: Record<string, string> = {};
    if (!props || typeof props !== 'object') {
        return events;
    }

    for (const key in props) {
        if (key in eventAttribute || !key.startsWith('on')) {
            continue;
        }

        const handler = props[key as keyof DomEventProps] as (...args: any[]) => any;
        if (!handler) {
            continue;
        }

        const func = extractFunction(handler);
        if (!func) {
            continue;
        }

        events[key.toLowerCase()] = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
    }

    return events;
};
