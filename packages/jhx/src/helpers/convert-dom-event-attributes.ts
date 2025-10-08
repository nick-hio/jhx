import { eventAttributes } from '../lib/htmx';
import type { DomEventProps } from '../types';
import { extractFunction } from './extract-function';

export const convertDomEventAttributes = <TDom extends object = object>(
    props: DomEventProps<TDom>,
): Record<string, unknown> => {
    const domEvents: Record<string, string> = {};
    const remainingProps = { ...props } as Record<string, unknown>;

    if (!props || typeof props !== 'object') {
        return domEvents;
    }

    for (const key in props) {
        if (key in eventAttributes || !key.startsWith('on')) {
            continue;
        }

        const handler = props[key as keyof DomEventProps];

        if (handler) {
            const func = extractFunction(handler);
            if (!func) {
                continue;
            }

            domEvents[key] = `((${func.params.join(',')}) => ${func.body})(${func.params.join(',')})`;
            delete remainingProps[key];
        }
    }

    return {
        ...remainingProps,
        ...domEvents,
    };
};
