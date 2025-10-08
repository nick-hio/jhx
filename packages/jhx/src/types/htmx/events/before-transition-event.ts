import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxBeforeTransitionEventProperties =
    | 'boosted'
    | 'elt'
    | 'etc'
    | 'failed'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'successful'
    | 'target'
    | 'xhr';

export interface HtmxBeforeTransitionEvent extends HtmxDomEvent {
    detail: Detail<HtmxBeforeTransitionEventProperties>;
    type: 'htmx:beforeTransition';
}
