import type { DOMAttributes } from 'react';

import type { DomEventProps } from './dom-event-props';
import type { HtmxAttribute, HtmxEventAttribute } from './htmx';

export type JhxAttribute =
    | HtmxAttribute
    | HtmxEventAttribute
    | Lowercase<keyof DomEventProps>
    | Lowercase<Exclude<keyof DOMAttributes<any>, 'children' | 'dangerouslySetInnerHTML'>>;
