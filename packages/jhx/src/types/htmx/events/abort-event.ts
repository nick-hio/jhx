import type { HtmxDomEvent } from '../htmx-dom-event.ts';
import type { Detail } from './detail';

type HtmxAbortEventProperties =
    | 'boosted'
    | 'elt'
    | 'error'
    | 'etc'
    | 'pathInfo'
    | 'requestConfig'
    | 'select'
    | 'target'
    | 'xhr';

export interface HtmxAbortEvent extends HtmxDomEvent {
    detail: Detail<HtmxAbortEventProperties>;
    type: 'htmx:abort';
}
