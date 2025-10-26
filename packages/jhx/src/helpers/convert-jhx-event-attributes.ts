import { eventAttribute } from '../lib/htmx/event-attribute';
import type { HtmxEventAttribute, HtmxEventProps } from '../types';
import { extractFunction } from './extract-function';

export const convertJhxEventAttributes = <TDom extends object = object>(
    props: HtmxEventProps<TDom>,
): Record<HtmxEventAttribute, string> => {
    const events: Record<string, string> = {};
    if (!props || typeof props !== 'object') {
        return events;
    }

    for (const key in eventAttribute) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const attributeName = eventAttribute[key as keyof typeof eventAttribute];

            const handler = props[key as keyof HtmxEventProps];
            if (!handler) {
                continue;
            }

            const func = extractFunction(handler);
            if (!func) {
                continue;
            }

            events[attributeName] = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
        }
    }

    return events;
};
