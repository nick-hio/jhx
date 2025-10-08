import { eventAttributes } from '../lib/htmx';
import type { HtmxEventAttribute } from '../lib/htmx';
import type { HtmxEventProps } from '../types';
import { extractFunction } from './extract-function';

export const convertJhxEventAttributes = <TDom extends object = object>(
    props: HtmxEventProps<TDom>,
): Record<string, unknown> => {
    const events: Record<HtmxEventAttribute, string> = {};
    const remainingProps = { ...props } as Record<string, unknown>;

    if (!props || typeof props !== 'object') {
        return events;
    }

    for (const key in eventAttributes) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            const eventKey = eventAttributes[key as keyof typeof eventAttributes];
            const handler = props[key as keyof HtmxEventProps];

            if (handler) {
                const func = extractFunction(handler);
                if (!func) {
                    continue;
                }

                events[eventKey] = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
                delete remainingProps[key];
            }
        }
    }

    return {
        ...remainingProps,
        ...events,
    };
};
